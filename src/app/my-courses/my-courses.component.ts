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
  	this.getCourses()
  }

  getCourses() {
  	var courses = [
  		{
  			name: "French",
  			author: "some french fuck"
  		},
  		{
  			name: "German",
  			author: "not hitler"
  		},
  	];

    let ul_item = document.createElement("ul");
    ul_item.className = "nav flex-column";

  	for(let course of courses) {
  		let course_btn = document.createElement('li');
        let course_btn_link = document.createElement('a')
        course_btn.className = "nav-item";

  		course_btn_link.innerText = course.name + " by " + course.author;
        course_btn_link.className = "nav-link active";
        course_btn_link.href = "#";
        course_btn.setAttribute("name",course.name + ":" + course.author);

        course_btn.onclick = (e) => {
            console.log(e);
            let nameVals = e.originalTarget.parentNode.attributes['name'].value.split(":") as MouseEvent;
            console.log("Going to " + nameVals[0] + " from user: " + nameVals[1]);
        };
        

        course_btn.appendChild(course_btn_link);
  		ul_item.appendChild(course_btn);
  	}
    document.getElementById('courses').appendChild(ul_item);
  }
}
