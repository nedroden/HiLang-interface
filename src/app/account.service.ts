import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HilangApiService } from './hilang-api.service';
import { CookieService } from './cookie.service';

@Injectable()

export class AccountService {

	constructor(private _api: HilangApiService, private _cookie: CookieService) { }

	userInfoUrl = 'http://localhost:8000/api/user/1/';



	getAccountSettings() {
		let user_id = this._cookie.getValue()['user_id'];
		return this._api.call('http://localhost:8000/api/user/' + user_id + '/', {});
	}
}
