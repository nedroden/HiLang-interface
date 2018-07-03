import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.css']
})
export class AccountsettingsComponent implements OnInit {

	userData = {
        avatar: "",
        name: "",
        email: "",
        bio: "",
        type: "",
        memberSince: "",
    };


	constructor(private _account: AccountService) {
	}


	ngOnInit() {
		this.showUserSettings()
	}


	showUserSettings() {
		this._account.getAccountSettings().subscribe(data => {
				this.userData['name'] = data['name'];
	            this.userData['email'] = data['email'];
	            this.userData['type'] = (data['distributor'] == 0) ? 'Normal user':'Distributor';
	            this.userData['memberSince'] = data['created_at'];
                this.userData['bio'] = data['bio'];
	            this.userData['avatar'] = data['avatar'];
			}, err => console.error(err),
            () => console.log('Done loading user data')
        )
	}


	saveSettings(){
		let email = <HTMLInputElement>document.getElementById('inputEmail');
		let username = <HTMLInputElement>document.getElementById('inputUsername');
		let avatar = <HTMLInputElement>document.getElementById('inputAvatar');
		let bio = <HTMLInputElement>document.getElementById('inputBio');
		let data = {
			email: email.value,
			username: username.value,
			avatar: avatar.value,
			bio: bio.value
		}
		this._account.postAccountSettings(data).subscribe();
		location.reload();
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
