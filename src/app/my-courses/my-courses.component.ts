import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    this.createMenu();
  }

  getCourses(courses, type) {
    while(document.getElementById('courses').firstChild) {
        document.getElementById('courses').removeChild(document.getElementById('courses').firstChild);
    }

    let ul_item = document.createElement("ul");
    ul_item.className = "nav flex-column";
    ul_item.classList.add("courseItem");

    let ignoreType = false;

    if(type == 1) {
        let createList_btn = document.createElement("button");
        createList_btn.innerText = "Add a lesson";
        createList_btn.id = "addListBtn";
        document.getElementById('courses').appendChild(createList_btn);
    }

  	for(let course of courses) {
        if(type == 2) {
            ignoreType = true;
        }
        if(type == course.type || ignoreType) {
            if(ignoreType && course.fav != 1) {
                continue;
            }
  	        let course_btn = document.createElement('li');
            let course_btn_link = document.createElement('a')
            course_btn.className = "nav-item";

  		    course_btn_link.innerText = course.name + " by " + course.author;
            course_btn_link.className = "nav-link active";
            course_btn_link.href = "#";

            course_btn.onclick = (e) => {
                console.log(e);
                let nameVals = e.originalTarget.parentNode.attributes['name'].value.split(":");
                console.log("Going to " + nameVals[0] + " from user: " + nameVals[1]);
            };

            course_btn.setAttribute("name",course.name + ":" + course.author);
            
            if(course.type == 1) {
                let edit_btn = document.createElement("button");
                edit_btn.innerText = "edit name";
                edit_btn.className = "editBtn";
                edit_btn.onclick = (e) => {
                    console.log(e);
                }
                document.getElementById('courses').appendChild(edit_btn);
            }

            course_btn.appendChild(course_btn_link);
  		    ul_item.appendChild(course_btn);
  	     }
        document.getElementById('courses').appendChild(ul_item);
    }
  }

  createMenu() {
    var courses = [
        {
            name: "French",
            author: "user1",
            type: 0,
            fav: 1,
        },
        {
            name: "German",
            author: "user1",
            type: 0,
            fav: 0,
        },
        {
            name: "Spanish",
            author: "##catalonieRules#",
            type: 1,
            fav: 0,
        },
        {
            name: "Dutch",
            author: "Jan Pieter",
            type: 1,
            fav: 1,
        },
    ];

    var menuItems = [
        {
            name: "Subsribed courses",
            function: () => this.getCourses(courses,0),
        },
        {
            name: "My courses",
            function: () => this.getCourses(courses,1),
        },
        {
            name: "Favourite Courses",
            function: () => this.getCourses(courses,2),
        },
    ];

    let ul_item = document.createElement("ul");
    ul_item.className = "nav flex-column";

    for(let item of menuItems) {
        let item_li = document.createElement('li');
        let item_link = document.createElement('a');

        item_li.className = "nav-item";

        item_link.innerText = item.name;
        item_link.className = "nav-link active";
        item_link.href = "#";

        item_li.onclick = item.function;
        item_li.appendChild(item_link);
        ul_item.appendChild(item_li);
    }
    document.getElementById('miniMenu').appendChild(ul_item);
  }
}
