import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

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
    courseDesc;
    courseImg;
    lessons;
	constructor(private courseService: CourseService) { }

    author = {
        avatar: "http://cdn.guardian.ng/wp-content/uploads/2016/05/Vladimir-Putin.jpg",
        about: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }

	ngOnInit() {
    this.subCourses = [];
    this.lessons = [];
    // this.lessons = [{'id' : 1, 'name': "English lesson 1", 'desc': "Food"}];

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
        this.courseService.getCourseDetails(id).subscribe(response => {
            this.courseName = response['name'];
            this.courseAuthor = response['author'];
            this.courseDesc = response['description'];
            this.courseImg = response['image'];
            if(response['favorite']) {
                document.getElementById('addFavorite').style.display = "none";
                document.getElementById('delFavorite').style.display = "block";
            } else {
                document.getElementById('addFavorite').style.display = "block";
                document.getElementById('delFavorite').style.display = "none";
            }
        });
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
