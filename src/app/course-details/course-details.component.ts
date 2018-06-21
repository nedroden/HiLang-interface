import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CookieService } from '../cookie.service';
import { LessonService } from '../lesson.service';
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
    courseId;
    courseName;
    courseAuthor;
    courseAuthorId;
    courseDesc;
    courseImg;
    lessons;
    languages;
    editable = false;

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
            this.courseId = response['id'];
            this.courseName = response['name'];
            this.courseAuthor = response['author'];
            this.courseAuthorId = response['authorId'];
            this.courseDesc = response['description'];
            this.courseImg = response['image'];
            if(document.getElementById('addFavorite') != null) {
                if(response['favorite']) {
                    document.getElementById('addFavorite').style.display = "none";
                    document.getElementById('delFavorite').style.display = "block";
                } else {
                    document.getElementById('addFavorite').style.display = "block";
                    document.getElementById('delFavorite').style.display = "none";
                }
            }
            if(document.getElementById('subscribeBtn') != null) {
                if(response['subscription']) {
                    document.getElementById('subscribeBtn').style.display = "none";
                    document.getElementById('UnSubscribeBtn').style.display = "block";
                } else {
                    document.getElementById('subscribeBtn').style.display = "block";
                    document.getElementById('UnSubscribeBtn').style.display = "none";
                }
            }
            if(this.courseAuthorId === this._cookies.getValue()['user_id'] && document.getElementById('addLesson') != null) {
                document.getElementById('addLesson').style.display="block";
                document.getElementById('course_edit').style.display="block";
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

    saveEdit() {
        let newDesc = (<HTMLInputElement>document.getElementById("course_desc_edit")).value;
        let courseData = {
            'id': this.courseId,
            'desc': newDesc,
        }
        this.courseService.editCourseDesc(courseData).subscribe();
        document.getElementById("course_desc_edit").style.display = "none";
        document.getElementById("saveDesc").style.display = "none";
        document.getElementById("course_desc").style.display = "block";
        document.getElementById("course_edit").style.display = "block";
        this.searchCourse(this.courseId);
        this.getLanguages();
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

    addFavorite() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.addFavorite(this._cookies.getValue()['user_id'], courseId).subscribe();
        document.getElementById('addFavorite').style.display = "none";
        document.getElementById('delFavorite').style.display = "block";
        this.searchCourse(this.courseId);
        this.getLanguages();
    }
    
    delFavorite() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.delFavorite(this._cookies.getValue()['user_id'], courseId).subscribe();
        document.getElementById('addFavorite').style.display = "block";
        document.getElementById('delFavorite').style.display = "none";
        this.searchCourse(this.courseId);
        this.getLanguages();
    }

    subscribe() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.subscribe(this._cookies.getValue()['user_id'], courseId).subscribe();
        document.getElementById('subscribeBtn').style.display = "none";
        document.getElementById('UnSubscribeBtn').style.display = "block";
        this.searchCourse(this.courseId);
        this.getLanguages();
    }

    unSubscribe() {
        let ulrParts = (window.location.href).split("/");
        let courseId = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseService.unSubscribe(this._cookies.getValue()['user_id'], courseId).subscribe();
        document.getElementById('subscribeBtn').style.display = "block";
        document.getElementById('UnSubscribeBtn').style.display = "none";
        this.searchCourse(this.courseId);
        this.getLanguages();
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