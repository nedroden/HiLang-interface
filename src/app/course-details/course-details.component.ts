import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
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
    courseName;
    courseAuthor;
    course_id: number;

	constructor(private courseService: CourseService,
                private _activatedRoute: ActivatedRoute) {}

    author = {
        avatar: "http://cdn.guardian.ng/wp-content/uploads/2016/05/Vladimir-Putin.jpg",
        about: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }

	ngOnInit() {
    this._activatedRoute.params.subscribe(params => this.course_id = params.id);

    this.subCourses = [
        {id: 0, name: "English for beginners",    author: "Learning.co"},
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

  addFavorite() {
    let ulrParts = (window.location.href).split("/");
    let courseId = parseInt(ulrParts[ulrParts.length - 1]);
    this.courseService.addFavorite(1,courseId).subscribe(response => console.log(response));
    document.getElementById('addFavorite').style.display = "none";
    document.getElementById('delFavorite').style.display = "block";
  }

  delFavorite() {
    let ulrParts = (window.location.href).split("/");
    let courseId = parseInt(ulrParts[ulrParts.length - 1]);
    this.courseService.delFavorite(1,courseId).subscribe(response => console.log(response));
    document.getElementById('addFavorite').style.display = "block";
    document.getElementById('delFavorite').style.display = "none";
  }

}
