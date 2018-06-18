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
        this.addKeyEvent();
        let ulrParts = (window.location.href).split("/");
        if(ulrParts[5] != null) {
            this.search(ulrParts[5]);
            let searchBar = (<HTMLInputElement>document.getElementById('browseBar'));
            searchBar.value = ulrParts[5];
        }
    }

    addKeyEvent() {
        let searchInput = (<HTMLInputElement>document.getElementById('browseBar'));
        searchInput.onkeypress = function(event) {
            if(event.keyCode === 13) {
                this.search((<HTMLInputElement>document.getElementById('browseBar')).value);
            }
        }.bind(this);
    }

    doSearch() {
        this.search((<HTMLInputElement>document.getElementById('browseBar')).value);
    }

    search(searchFor: String) {
        this.courses = [];
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
