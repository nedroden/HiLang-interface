import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
	languages;
	constructor(private courseService: CourseService) {}
	ngOnInit() {
		this.languages = [];
		this.courseService.getLanguages().subscribe(response => {
			let subLanguages = [];
			for(let language of <Array<any>>response) {
				subLanguages.push({
					name: language['fields']['name'],
					flag: language['fields']['flag']
				});
			}
			this.languages = subLanguages;
		});
  		//let dispatch = Dispatch.getInstance();
  		//var loginButton = document.getElementById("login-button");
  		//loginButton.onclick = dispatch.do("login");
	}
}
