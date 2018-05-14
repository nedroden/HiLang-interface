import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	this.createElement();
  }

  createElement() {
		let menuItems = [
			{
				label: "Home",
			},
			{
				label: "Account",
			},
			{
				label: "Browse",
			},
			{
				label: "My courses",
			},
			{
				label: "Log out",
			},
		];

		for(let item of menuItems) {
			let li-element = document.createElement("li");
			element.innerText = item.label;
			document.getElementById('menuBar').appendChild(element);
		}

}
