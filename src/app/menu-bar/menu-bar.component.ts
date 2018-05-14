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
		let ul_item = document.createElement("ul");
		ul_item.className = "nav flex-column";
		console.log(ul_item.className);

		for(let item of menuItems) {
			let li_item = document.createElement("li");
			li_item.className = "nav-item";

			console.log(li_item);

			let a_item = document.createElement("a");
			a_item.innerText = item.label;
			a_item.className = "nav-link";

			console.log(a_item);

			li_item.appendChild(a_item);
			ul_item.appendChild(li_item);
			//btn.onclick( console.log("test"));
			//btn.innerText = item.label;
			document.getElementById('menuBar').appendChild(ul_item);
		}
	}
}
