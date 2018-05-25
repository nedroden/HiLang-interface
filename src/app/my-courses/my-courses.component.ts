import { Component, OnInit} from '@angular/core';
import { MiniMenuItems } from './MiniMenuItems';
import { Course } from './Course';
import { CourseService } from '../course.service';

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
  data = [];
  constructor(private _courses: CourseService) {

  }

  ngOnInit() {
    this.miniMenu = [
        {name: "Subsribed courses", function: () => this.showSubCourses()},
        {name: "My courses",        function: () => this.showUserCourses()},
        {name: "Favourite Courses", function: () => this.showFavCourses()},
    ];
    this.subCourses = [
        {id: 0, name: "English",    user: "Learning.co"},
        {id: 1, name: "Spanish",    user: "Learning.co"},
        {id: 2, name: "Hongarian",  user: "Learning.co"},
        {id: 3, name: "Slovac",     user: "Learning.co"},
    ];

    this.myCourses = [
        {id: 4, name: "Dutch",      user: "Jelmer"},
        {id: 5, name: "French",     user: "Jelmer"},
        {id: 6, name: "German",     user: "Jelmer"},
        {id: 7, name: "English",    user: "Jelmer"},
    ];

    this.favCourses = [
        {id: 4, name: "Dutch",      user: "Jelmer"},
        {id: 5, name: "French",     user: "Jelmer"},
        {id: 2, name: "Hongarian",  user: "Learning.co"},
        {id: 3, name: "Slovac",     user: "Learning.co"},
    ];
    this.currentId = 8;

    this._courses.getCourses().subscribe(res => this.data = res)
  }

  showSubCourses() {
    this.hideAll();
    document.getElementById('subCourses').style.display = 'block'
    console.log(this._courses.getCourses())
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
        let newCourse = {id: this.currentId, name: courseInput.value, user: "Jelmer"}
        this.currentId++;
        this.myCourses.push(newCourse);
        courseInput.value = "";
        courseInput.style.display = 'none';

    }
    }.bind(this);
  }

}