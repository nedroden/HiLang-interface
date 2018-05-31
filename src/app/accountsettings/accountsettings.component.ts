import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.css']
})
export class AccountsettingsComponent implements OnInit {
	
	userData;


	constructor(private _account: AccountService) {
	}


	ngOnInit() {
		this.showUserSettings()
	}

	
	showUserSettings() {
		this._account.getAccountSettings().subscribe(
			data => {this.userData = data[0].fields
				console.log(this.userData)},
            err => console.error(err),
            () => console.log('Done loading user data')
        )
	}


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


}
