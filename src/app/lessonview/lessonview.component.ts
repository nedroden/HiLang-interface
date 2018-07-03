import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { LessonDetailsService } from '../lesson-details.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-lessonview',
  templateUrl: './lessonview.component.html',
  styleUrls: ['./lessonview.component.css']
})
export class LessonviewComponent implements OnInit {

    private lesson = {
        counter: 0,
        id: "",
        name: "",
        desc: "",
        cat: "",
        grammar: "",
        source_language: "",
        target_language: "",
        vocabulary: [],
        language_short: "",
        author: {
            avatar: "https://4.bp.blogspot.com/-O5q3YjRkago/UI9JEEXttiI/AAAAAAAAK8E/IijPhTpQJCw/s1600/Statue+of+Liberty+NY+%282%29.jpg",
            about: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    }
    id: number;
    courseId;
    authorId: number;
    editable;

    constructor(private courseService: CourseService,
                private lesDetService: LessonDetailsService,
                private _cookie: CookieService,
                public router: Router) { }

    ngOnInit() {
        this.editable = false;
        let ulrParts = (window.location.href).split("/");
        this.id = parseInt(ulrParts[ulrParts.length - 1]);
        this.courseId = parseInt(ulrParts[ulrParts.length - 2]);
        this.authorId = parseInt(ulrParts[ulrParts.length - 3]);
        this.lesson['counter'] = parseInt(ulrParts[ulrParts.length - 4]);
        this.courseService.getLessonDet(this.id).subscribe(response => {
            console.log(response);
            if (!response){
                console.log('test');
                this.router.navigate(['user/']);
            } else {
                if (response == false)
                    this.router.navigate(['user/'])
                else {
                    this.lesson['id'] = response['id'];
                    this.lesson['name'] = response['name'];
                    this.lesson['desc'] = response['desc'];
                    this.lesson['cat'] = response['cat'];
                    this.lesson['grammar'] = response['grammar'];
                    this.lesson['source_language'] = response['native'];
                    this.lesson['target_language'] = response['trans'];
                    this.lesson['language_short'] = response['language_short'];
                }
            }
        });
        this.courseService.getLesson(this.id).subscribe(response => {
            let subVoc = [];
            let counter = 0;
            for(let entry of response['vocabulary']) {
                subVoc.push({
                    index: ++counter,
                    native: entry['native'],
                    translation: entry['translation'],
                    sentence: entry['sentenceStructure'],
                })
            }
            this.lesson['vocabulary'] = subVoc;
        });
        if(this.authorId === this._cookie.getValue()['user_id'])
            this.editable = true;
    }

    getLanguage(id:number, type: number) {
        this.courseService.getLangDetails(id).subscribe(response => {
            if(type === 0)
                this.lesson['source_language'] = response[0]['fields']['name'];
            else if(type === 1)
                this.lesson['target_language'] = response[0]['fields']['name'];
        });
    }

    edit() {
        let details = {
            id: this.lesson['id'],
            name: this.lesson['name'],
            category: this.lesson['cat'],
            description: this.lesson['desc'],
            grammar: this.lesson['grammar'],
            course: this.courseId,
            vocabulary: this.lesson['vocabulary']
        }
        this.lesDetService.saveDetails(details);
        this.router.navigate(['/user/course-details/' + this.courseId + '/create-list']);
    }

    delete() {
        if(confirm("Are you sure you want to delete this lesson?")) {
            this.courseService.delLesson(this.id).subscribe(response => {
                this.router.navigate(['user/course-details/' + this.courseId])
            });
        }
    }
}
