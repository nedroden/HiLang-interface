import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HilangApiService } from './hilang-api.service';
import { CookieService } from './cookie.service';
import { environment } from '../environments/environment';


@Injectable()

export class AccountService {

	constructor(private _api: HilangApiService, private _cookie: CookieService, private _http: HttpClient) { }

	userInfoUrl = '/user/1/';

	getAccountSettings() {
		let user_id = this._cookie.getValue()['user_id'];
		return this._api.call('/user/' + user_id + '/', {});
	}

	postAccountSettings(params: object){
		console.log('hij komt hier')
		let user_id = this._cookie.getValue()['user_id'];
		return this._api.call('/user/' + user_id + '/edituser/', params);
	}
}
