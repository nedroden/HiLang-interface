import { Component, OnInit } from '@angular/core';
import { Course } from './Course'

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  courses: Course[];

  constructor() { }

  ngOnInit() {
  	this.courses = [
  		{id: 0, name: "Portugeese", author: "user2"},
  		{id: 1, name: "Spanish", 	author: "user2"},
  		{id: 2, name: "Italian", 	author: "user2"},
  		{id: 3, name: "Greek", 		author: "user2"},
  		{id: 4, name: "Hungarian", 	author: "user2"},
  	];
  }
}
