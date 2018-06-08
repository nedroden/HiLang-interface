import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private _con: LoginService, private _cookie: CookieService) { }

    ngOnInit() {
    }

    login() {
        let userData = {
        	email: document.getElementById('loginEmail')['value'],
        	password: document.getElementById('loginPassword')['value'],
        }

        this._con.postLoginData(userData).subscribe(data => {
            if (data['user_id'] && data['token']) {
                this._cookie.createCookie(data);
                window.location.href = "/user";
            } else {
                // Iets van een melding ofzo
            }
        });
    }
}
