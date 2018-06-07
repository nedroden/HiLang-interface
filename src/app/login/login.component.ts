import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private _con: LoginService) { }

    ngOnInit() {
    }

    login() {
        let userData = {
        	email: document.getElementById('loginEmail').value,
        	password: document.getElementById('loginPassword').value,
        }

        this._con.postLoginData(userData).subscribe(data => {
            if (data.user && data.token) {
                console.log(data);
                let d = new Date();
                d.setTime(d.getTime() + (10*24*60*60*1000));
                document.cookie = "expires="+ d.toUTCString();
                document.cookie = "name=" + data.user.name;
                document.cookie = "email=" + data.user.email;
                document.cookie = "distributor=" + data.user.distributor;
                document.cookie = "token=" + data.token;
                window.location.href = "/user";
            } else {
                // Iets van een melding ofzo
            }
        });
    }
}
