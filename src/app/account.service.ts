import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AccountService {

	constructor(private http: HttpClient) { }

	userInfoUrl = 'http://localhost:8000/api/user/1/';

	getAccountSettings() {
		return this.http.get('http://localhost:8000/api/user/1/');
	}
}



