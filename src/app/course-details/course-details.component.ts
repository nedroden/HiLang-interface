import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CookieService } from '../cookie.service';
import { LessonService } from '../lesson.service';
import { ErrorNotification } from '../utils/errornotification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
	subCourses;
    myCourses;
    favCourses;
    lessonCounter;
    private courseId: number;
    private courseName: string;
    private courseAuthor = {name: "", bio: ""};
    private editing = false;
    private courseAuthorId: number;
    private courseDesc: string;
    private courseImg: string;
    private lessons;
    private nativeLang: number;
    private transLang: number;
    private courseDate;
    private languages;
    private favorite: boolean;
    private subscribed: boolean;
    private editable = false;

	constructor(private courseService: CourseService,
                private _activatedRoute: ActivatedRoute,
                private _cookies: CookieService,
                private _lessonService: LessonService) {}


    author = {
        avatar: "http://cdn.guardian.ng/wp-content/uploads/2016/05/Vladimir-Putin.jpg",
        about: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }

	ngOnInit() {
        this.subCourses = [];
        this.lessons = [];
        this.languages = [];
        let ulrParts = (window.location.href).split("/");
	    this.searchCourse(parseInt(ulrParts[ulrParts.length - 1]));
        this.getLanguages();
	}

	searchCourse(id) {
        this.courseService.getCourseDetails(id).subscribe(response => {
            console.log(response);
            this.courseId = response['id'];
            this.courseName = response['name'];
            this.courseAuthor = response['author'];
            this.courseAuthorId = response['authorId'];
            this.courseDesc = response['description'];
            this.courseImg = response['image'];
            this.nativeLang = response['native_lang'];
            this.transLang = response['trans_lang'];
            this.subscribed = response['subscription'];
            this.favorite = response['favorite'];
            this.courseDate = response['created_at'];

            if(this.courseAuthorId === this._cookies.getValue()['user_id']) {
                this.editable = true;
            }
            this.getLessons();
        });
	}

    getLanguages(){
        this.courseService.getLanguages().subscribe(response => {
            for(let language of response as Array<any>) {
                this.languages.push({
                    id: language.pk,
                    name: language.fields['name']
                })
            }
        });
    }

    edit() {
        if(this.editable) {
            let editor = (<HTMLInputElement>document.getElementById("course_desc_edit"))
            let desc = (<HTMLInputElement>document.getElementById("course_desc"))
            editor.value = desc.innerText;

            editor.style.display = "block";
            document.getElementById("saveDesc").style.display = "block";
            desc.style.display = "none";
            document.getElementById("course_edit").style.display = "none";
        }
    }

    getLessons() {
        this.courseService.getCourseLessons(this.courseId).subscribe(response => {
            let subLessons = [];
            this.lessonCounter = 0;
            for(let lesson of <Array<any>>response) {
                subLessons.push( {
                    id: lesson.pk,
                    counter: ++this.lessonCounter,
                    name: lesson.fields['name'],
                    desc: lesson.fields['description'],
                });
            }
            this.lessons = subLessons;
        });
        let userData = {
            user_id: this._cookies.getValue()['user_id']
        }
        this._lessonService.getCompletedLessons(userData).subscribe(response => {
            for(let completedLesson of response as Array<any>) {
                for(let lesson of this.lessons) {
                    if(lesson['id'] === completedLesson['lesson_id']) {
                        document.getElementById('lesson_' + completedLesson['lesson_id']).className += " list-group-item-success";
                    }
                }
            }
        });

    }

    editCourse() {
        this.editing = true;
    }

    disableEditing() {
        this.editing = false;
    }

    saveCourse() {
        let name = (<HTMLInputElement>document.getElementById('courseNameInput'))['value'];
        let description = (<HTMLInputElement>document.getElementById('courseDescInput'))['value'];
        let native_lang = (<HTMLInputElement>document.getElementById('native_lang'))['value'];
        let target_lang = (<HTMLInputElement>document.getElementById('target_lang'))['value'];

        if (name != '' && native_lang != '' && target_lang != '' ) {
                this.courseService.updateCourse({
                    id: this.courseId,
                    name: name,
                    description: description,
                    native_lang: native_lang,
                    target_lang: target_lang,
                }).subscribe(response => {
                    if (response) {
                        console.log(response);
                        this.courseName = name;
                        this.courseDesc = description;
                        this.nativeLang = +native_lang;
                        this.transLang = +target_lang;
                    } else {
                        let errorNotification = new ErrorNotification('Oops, something went wrong..', 'errorMessage', 'danger');
                        errorNotification.setTimeout(3000);
                        errorNotification.render();
                    }
                });
                this.disableEditing();
            } else {
                let errorNotification = new ErrorNotification('Fill in the required fields!', 'errorMessage', 'danger');
                errorNotification.setTimeout(3000);
                errorNotification.render();
            }
    }

    addFavorite() {
        this.courseService.addFavorite(this._cookies.getValue()['user_id'], this.courseId).subscribe();
        this.favorite = true;
    }

    delFavorite() {
        this.courseService.delFavorite(this._cookies.getValue()['user_id'], this.courseId).subscribe();
        this.favorite = false;
    }

    subscribe() {
        this.courseService.subscribe(this._cookies.getValue()['user_id'], this.courseId).subscribe();
        this.subscribed = true;
    }

    unSubscribe() {
        this.courseService.unSubscribe(this._cookies.getValue()['user_id'], this.courseId).subscribe();
        this.subscribed = false;
    }

    selectLang() {
        let selName =  (<HTMLInputElement>document.getElementById('select_lang')).value;
        for(let language of this.languages) {
            if(language.name === selName) {
                let langData = {
                    id: this.courseId,
                    lang_id: language.id
                }
                this.courseService.editCourseLang(langData).subscribe();
            }
        }
    }
}
