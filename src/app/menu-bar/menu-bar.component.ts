import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() { 
  	
  }

  ngOnInit() {
  	this.createElement();
  }

  createElement() {
		let menuItems = [
			{
				label: "Account",
				href: "#"
			},
			{
				label: "Browse",
				href: "#"
			},
			{
				label: "My courses",
				href: "#"
			},
			{
				label: "Log out",
				href: "#"
			},
		];
		let ul_item = document.createElement("ul");
		ul_item.className = "nav flex-column";
		   
		for(let item of menuItems) {
			let li_item = document.createElement("li");
			li_item.className = "nav-item";

			let a_item = document.createElement("a");
			a_item.innerText = item.label;
			a_item.href = item.href;
			a_item.onclick = () => alert(item.label);
			a_item.className = "nav-link";

			li_item.appendChild(a_item);
			ul_item.appendChild(li_item);
			document.getElementById('menuBar').appendChild(ul_item);
		}
	}
}
