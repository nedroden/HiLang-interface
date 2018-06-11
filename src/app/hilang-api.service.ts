import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class HilangApiService {

  constructor(private _http: HttpClient, private _cookie: CookieService) { }

  call(url: string, params: object) {
      let data = {
          user_id: this._cookie.getValue()['user_id'],
          token: this._cookie.getValue()['token'],
          params: params,
      }

      return this._http.post(url, data, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  login(params: object) {
      return this._http.post('http://localhost:8000/api/login', params, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})});
  }
}
