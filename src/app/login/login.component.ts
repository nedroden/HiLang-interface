import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CookieService } from '../cookie.service';
import { ErrorNotification } from '../utils/errornotification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private _con: LoginService, private _cookie: CookieService, private _router: Router) { }

    ngOnInit() {
        this._cookie.checkValidity();
        if (this._cookie.getValue() != null)
            this._router.navigate(["/user"]);
    }

    login() {
        let userData = {
        	email: document.getElementById('loginEmail')['value'],
        	password: document.getElementById('loginPassword')['value'],
        }

        this._con.postLoginData(userData).subscribe(data => {
            if (data['user_id'] && data['token']) {
                this._cookie.createCookie(data);
            } else {
                let errorNotification = new ErrorNotification('Unable to login', 'error', 'danger');
                errorNotification.setTimeout(3000);
                errorNotification.render();
            }
        });
    }
}
