import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  miniMenu: MiniMenuItems[];
  subCourses: Course[];

  constructor() {

  }

  ngOnInit() {
    this.miniMenu = [
        {name: "Subsribed courses", function: () => this.showSubCourses()},
        {name: "My courses",        function: () => this.showUserCourses()},
        {name: "Favourite Courses", function: () => this.showFavCourses()},
    ];
    this.subCourses = [
        {name: "English",    auhtor: "Learning.co"},
        {name: "Spanish",    auhtor: "Learning.co"},
        {name: "Hongarian",  auhtor: "Learning.co"},
        {name: "Slovac",     auhtor: "Learning.co"},
    ];

    this.myCourses = [
        {name: "Dutch",      auhtor: "Jelmer"},
        {name: "French",     auhtor: "Jelmer"},
        {name: "German",     auhtor: "Jelmer"},
        {name: "English",   auhtor: "Jelmer"},
    ];

    this.favCourses = [
        {name: "Dutch",      auhtor: "Jelmer"},
        {name: "French",     auhtor: "Jelmer"},
        {name: "Hongarian",  auhtor: "Learning.co"},
        {name: "Slovac",     auhtor: "Learning.co"},
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
