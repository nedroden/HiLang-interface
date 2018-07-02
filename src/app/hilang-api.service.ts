import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

import { environment } from '../environments/environment';

@Injectable()
export class HilangApiService {

  constructor(private _http: HttpClient, private _cookie: CookieService) { }

  call(url: string, params: object) {
      let data = {
          user_id: this._cookie.getValue()['user_id'],
          token: this._cookie.getValue()['token'],
          params: params,
      }
      console.log(environment.api_url + url)
      return this._http.post(environment.api_url + url, data, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  unsafeGet(url: string) {
      return this._http.get(environment.api_url + url, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  unsafePost(url: string, params: object) {
      return this._http.post(environment.api_url + url, params, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  login(params: object) {
      return this._http.post(environment.api_url + 'login', params, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})});
  }
}
