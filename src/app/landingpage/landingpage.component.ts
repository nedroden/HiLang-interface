import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';
import { ErrorNotification } from '../utils/errornotification';
import { LoadingScreen } from '../utils/loadingScreen';

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

    register() {
        let name = document.getElementById('registerName');
        let email = document.getElementById('registerEmail');
        let password = document.getElementById('registerPassword');
        let confirmPassword = document.getElementById('registerConfirm');

        if (email['value'] != '' && name['value'] != '' && password['value'] != '' && password['value'] == confirmPassword['value']) {
            let loadingScreen = new LoadingScreen();
            loadingScreen.render();
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
                    loadingScreen.disable();
                }
            });
        } else {
            alert('Vul alle velden in!');
        }
    }
}
