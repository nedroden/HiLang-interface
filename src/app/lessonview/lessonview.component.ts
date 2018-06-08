import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-lessonview',
  templateUrl: './lessonview.component.html',
  styleUrls: ['./lessonview.component.css']
})
export class LessonviewComponent implements OnInit {

    lesson = {
        id: 0,
        name: "",
        desc: "",
        cat: "",
        source_language: "",
        target_language: "",
        vocabulary: [],
        author: {
            avatar: "https://4.bp.blogspot.com/-O5q3YjRkago/UI9JEEXttiI/AAAAAAAAK8E/IijPhTpQJCw/s1600/Statue+of+Liberty+NY+%282%29.jpg",
            about: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    }
    id: number;
    authorId: number;
    editable;

    constructor(private courseService: CourseService) { }

    ngOnInit() {
        this.editable = false;
        let ulrParts = (window.location.href).split("/");
        this.id = parseInt(ulrParts[ulrParts.length - 1]);
        this.authorId = parseInt(ulrParts[ulrParts.length - 2]);
        this.courseService.getLessonDet(this.id).subscribe(response => {
            if(response != null) {
                this.lesson['id'] = response['id'];
                this.lesson['name'] = response['name'];
                this.lesson['desc'] = response['desc'];
                this.lesson['cat'] = response['cat'];
                this.lesson['source_language'] = response['native'],
                this.lesson['target_language'] = response['trans']
            }
        });
        this.courseService.getLesson(this.id).subscribe(response => {
            let subVoc = [];
            for(let entry of response[0]['vocabulary']) {
                subVoc.push({
                    index: entry['id'],
                    native: entry['native'],
                    translation: entry['translation']
                })
            }
            this.lesson['vocabulary'] = subVoc;
        });
        //replace 1 with user id
        if(this.authorId === 1) {
            this.editable = true;
        }
    }

    getLanguage(id:number, type: number) {
        this.courseService.getLangDetails(id).subscribe(response => {
                    if(type === 0) {
                        this.lesson['source_language'] = response[0]['fields']['name'];
                    } else if(type === 1) {
                        this.lesson['target_language'] = response[0]['fields']['name'];
                    }
                });
    }

    edit() {
        if(this.editable) {
            let editor = (<HTMLInputElement>document.getElementById("lesson_desc_edit"))
            let desc = (<HTMLInputElement>document.getElementById("lesson_desc"))
            editor.value = desc.innerText;

            editor.style.display = "block";
            document.getElementById("saveLessonDesc").style.display = "block";
            desc.style.display = "none";
            document.getElementById("lesson_edit").style.display = "none";
        }
    }

    saveEdit() {
        let newDesc = (<HTMLInputElement>document.getElementById("lesson_desc_edit")).value;
        let courseData = {
            'id': this.id,
            'desc': newDesc,
        }
        this.courseService.editLessonDesc(courseData).subscribe();
        document.getElementById("lesson_desc_edit").style.display = "none";
        document.getElementById("saveLessonDesc").style.display = "none";
        document.getElementById("lesson_desc").style.display = "block";
        document.getElementById("lesson_edit").style.display = "block";
    }
}