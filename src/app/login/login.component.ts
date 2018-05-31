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
  		email: 'jan@hotmail.com',
  		password: 'welkom123'
  	}
  	this._con.postLoginData(userData).subscribe(loggedIn => console.log(loggedIn));
  }

}
