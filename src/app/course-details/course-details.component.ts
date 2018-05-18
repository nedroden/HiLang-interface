import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
	subCourses;
  	myCourses;
  	favCourses;

  	courseName;
  	courseAuthor;
	constructor() { }

	ngOnInit() {
    this.subCourses = [
        {id: 0, name: "English",    author: "Learning.co"},
        {id: 1, name: "Spanish",    author: "Learning.co"},
        {id: 2, name: "Hongarian",  author: "Learning.co"},
        {id: 3, name: "Slovac",     author: "Learning.co"},
    ];

    this.myCourses = [
        {id: 4, name: "Dutch",      author: "Jelmer"},
        {id: 5, name: "French",     author: "Jelmer"},
        {id: 6, name: "German",     author: "Jelmer"},
        {id: 7, name: "English",    author: "Jelmer"},
    ];

    this.favCourses = [
        {id: 4, name: "Dutch",      author: "Jelmer"},
        {id: 5, name: "French",     author: "Jelmer"},
        {id: 2, name: "Hongarian",  author: "Learning.co"},
        {id: 3, name: "Slovac",     author: "Learning.co"},
    ];
    	let ulrParts = (window.location.href).split("/");
		this.searchCourse(parseInt(ulrParts[ulrParts.length - 1]));
	}

	searchCourse(id) {
		for(let item of this.subCourses) {
			if(item.id === id) {
				this.courseName = item.name;
				this.courseAuthor = item.author;
			}
		}

		for(let item of this.myCourses) {
			if(item.id === id) {
		    this.courseName = item.name;
				this.courseAuthor = item.author;
				document.getElementById('addLesson').style.display = "block";
			}
		}
	}

}
