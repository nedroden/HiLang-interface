import { Component, OnInit } from '@angular/core';
import { MiniMenuItems } from './MiniMenuItems';
import { Course } from './Course';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  miniMenu;
  subCourses;
  myCourses;
  favCourses;
  constructor() {

  }

  ngOnInit() {
    this.miniMenu = [
        {name: "Subsribed courses", function: () => this.showSubCourses()},
        {name: "My courses",        function: () => this.showUserCourses()},
        {name: "Favourite Courses", function: () => this.showFavCourses()},
    ];
    this.subCourses = [
        {name: "English",    author: "Learning.co"},
        {name: "Spanish",    author: "Learning.co"},
        {name: "Hongarian",  author: "Learning.co"},
        {name: "Slovac",     author: "Learning.co"},
    ];

    this.myCourses = [
        {name: "Dutch",      author: "Jelmer"},
        {name: "French",     author: "Jelmer"},
        {name: "German",     author: "Jelmer"},
        {name: "English",    author: "Jelmer"},
    ];

    this.favCourses = [
        {name: "Dutch",      author: "Jelmer"},
        {name: "French",     author: "Jelmer"},
        {name: "Hongarian",  author: "Learning.co"},
        {name: "Slovac",     author: "Learning.co"},
    ];
  }

  showSubCourses() {
    this.hideAll();
    document.getElementById('subCourses').style.display = 'block'
  }

  showUserCourses() {
    this.hideAll();
    document.getElementById('myCourses').style.display = 'block'
    document.getElementById('addCourse').style.display = 'block'
  }

  showFavCourses() {
    this.hideAll();
    document.getElementById('favCourses').style.display = 'block'
  }

  hideAll() {
    document.getElementById('addCourse').style.display = 'none'
    document.getElementById('subCourses').style.display = 'none'
    document.getElementById('myCourses').style.display = 'none'
    document.getElementById('favCourses').style.display = 'none'
  }

  addCourseInput() {
    document.getElementById('courseInput').style.display = 'block';
    let courseInput = (<HTMLInputElement>document.getElementById('courseInput'));
    courseInput.onkeypress = function(event) {
    if(event.keyCode === 13) {
        let newCourse = {name: courseInput.value, author: "Jelmer"}
        this.myCourses.push(newCourse);
    }
    }.bind(this);
  }

}