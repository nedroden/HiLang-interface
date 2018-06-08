import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    publicCourses = [];
    courses = [];

    constructor(private _courses : CourseService) { }

    ngOnInit() {
    }

    search() {
        this.courses = [];
        let searchFor = (<HTMLInputElement>document.getElementById('browseBar')).value;
        this._courses.searchForPublicCourse(searchFor).subscribe(response => {
            for(let course of <Array<any>>response) {
                this.courses.push({
                    id: course['id'],
                    name: course['name'],
                    description: course['description'],
                    image: course['image'],
                    subscribers: course['subscribers'],
                    author: course['author']
                });
            }
            this.publicCourses = this.courses;
        });
    }
}
