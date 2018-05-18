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
  currentId: number;
  constructor() {

  }

  ngOnInit() {
    this.miniMenu = [
        {name: "Subscribed courses", function: () => this.showSubCourses()},
        {name: "My courses",        function: () => this.showUserCourses()},
        {name: "Favourite Courses", function: () => this.showFavCourses()},
    ];
    this.subCourses = [
        {id: 0, name: "English",    author: "Learning.co"},
        {id: 1, name: "Spanish",    author: "Learning.co"},
        {id: 2, name: "Hungarian",  author: "Learning.co"},
        {id: 3, name: "Slovak",     author: "Learning.co"},
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
        {id: 2, name: "Hungarian",  author: "Learning.co"},
        {id: 3, name: "Slovak",     author: "Learning.co"},
    ];
    this.currentId = 8;
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
        let newCourse = {id: this.currentId, name: courseInput.value, author: "Jelmer"}
        this.currentId++;
        this.myCourses.push(newCourse);
        courseInput.value = "";
        courseInput.style.display = 'none';

    }
    }.bind(this);
  }

}