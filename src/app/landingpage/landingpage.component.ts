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

    

    register() {
        let name = document.getElementById('registerName');
        let email = document.getElementById('registerEmail');
        let password = document.getElementById('registerPassword');
        let confirmPassword = document.getElementById('registerConfirm');
        var upperCaseLetters = /[A-Z]/g;
        var lowerCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if (email['value'] == '' || name['value'] == '' || password['value'] == '' ) {
            let errorNotification = new ErrorNotification("Please fill in all fields", 'registerError', 'danger');
            errorNotification.setTimeout(3000);
            errorNotification.render();
            return
        }
        else if(name['value'].length > 30) {
            let errornotification = new ErrorNotification('Please shorten your user name to 30 characters or less', 'registerError', 'danger');
            errornotification.setTimeout(3000);
            errornotification.render();
            return
        }
        else if(email['value'] != '' && !email['value'].includes('@')){
            let errorNotification = new ErrorNotification('Please enter a valid email address', 'registerError', 'danger');
            errorNotification.setTimeout(3000);
            errorNotification.render();
            return
        }
        else if(password['value'] != confirmPassword['value']){
            let errorNotification = new ErrorNotification("Paswords don't match", 'registerError', 'danger');
            errorNotification.setTimeout(3000);
            errorNotification.render();
            return
        }
        else if(!password['value'].match(upperCaseLetters)|| !password['value'].match(lowerCaseLetters) || !password['value'].match(numbers) || password['value'].length < 8) {
            let errorNotification = new ErrorNotification("Your password must contain atleast one capital letter and number", 'registerError', 'danger');
            errorNotification.setTimeout(3000);
            errorNotification.render();
            return
        }

        else {
            let params = {
                name: name['value'],
                email: email['value'],
            	password: password['value']
            };
            this._api.unsafePost('/user/create/', params).subscribe(data => {
                if (data['error'])
                    alert(data['error']);
                else {
                    this._cookie.createCookie(data);
                }
            });
        }
    }
}
