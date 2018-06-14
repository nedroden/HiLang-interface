import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
	languages;
	constructor(private _course: CourseService, private _api: HilangApiService, private _cookie: CookieService) {}
	ngOnInit() {
		this.languages = [
			{
				name: "English",
				flag: "england"
			}
		];
		this._course.getLanguages().subscribe(response => {
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

    register() {
        let name = document.getElementById('registerName');
        let email = document.getElementById('registerEmail');
        let password = document.getElementById('registerPassword');
        let confirmPassword = document.getElementById('registerConfirm');

        if (email['value'] != null && name['value'] != null && password['value'] != null && password['value'] == confirmPassword['value']) {
            let params = {
                name: email['name'],
                email: email['value'],
            	password: password['value']
            };
            this._api.unsafePost('http://localhost:8000/api/user/create/', params).subscribe(data => {
                if (data['error'])
                    alert(data['error']);
                else {
                    this._cookie.createCookie(data);
                }
            });
        }
    }
}
