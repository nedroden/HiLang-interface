import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	ngOnInit()  {
		this.createElement();
	}
  	title = 'Hi, Lang';
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
			let element = document.createElement("li");
			element.innerText = item.label;
			document.getElementById('menuBar').appendChild(element);
		}

		
  }
}

