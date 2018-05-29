import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.css']
})
export class AccountsettingsComponent implements OnInit {

	user = {
		email: "email@example.com",
		username: "",
		interface_lang: 2,
		native_lang: 1,
	}

	interface_languages = [
		{
			name: "German",
			id: 0,
		},
		{
			name: "French",
			id: 1,
		},
		{
			name: "English",
			id: 2,
		}
	]

native_languages = [
		{
			name: "German",
			id: 0,
		},
		{
			name: "French",
			id: 1,
		},
		{
			name: "English",
			id: 2,
		}
	]


  constructor() { }

  ngOnInit() {
  }

}
