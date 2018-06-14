import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HilangApiService } from './hilang-api.service';

@Injectable()

export class AccountService {

	constructor(private _api: HilangApiService) { }

	userInfoUrl = 'http://localhost:8000/api/user/1/';

	getAccountSettings() {
		return this._api.call('http://localhost:8000/api/user/1/', {});
	}
}
