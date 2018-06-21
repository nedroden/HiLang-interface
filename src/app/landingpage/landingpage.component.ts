import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';
import { ErrorNotification } from '../utils/errornotification';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
	languages;
	constructor(private _course: CourseService, private _api: HilangApiService, private _cookie: CookieService) {}
	ngOnInit() {
		this.languages = [];

		this._course.getLanguages().subscribe(response => {
			let subLanguages = [];
			for(let language of <Array<any>>response) {
                if (subLanguages.length < 6) {
    				subLanguages.push({
    					name: language['fields']['name'],
    					flag: language['fields']['flag']
    				});
                }
			}
			this.languages = subLanguages;
		});
	}

    // let errorNotification = new ErrorNotification('Unable to login', 'error', 'danger');
    // errorNotification.setTimeout(3000);
    // errorNotification.render();

    register() {
        let name = document.getElementById('registerName');
        let email = document.getElementById('registerEmail');
        let password = document.getElementById('registerPassword');
        let confirmPassword = document.getElementById('registerConfirm');

        if (email['value'] != '' && name['value'] != '' && password['value'] != '' && password['value'] == confirmPassword['value']) {
            let params = {
                name: name['value'],
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
        } else {
            alert('Vul alle velden in!');
        }
    }
}
