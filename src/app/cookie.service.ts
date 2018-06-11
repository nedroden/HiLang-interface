import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private value: object;

  constructor(private _router: Router, private _http: HttpClient) { }

  getValue() {
      return this.value;
  }

  getCookie() {
      for (let item of document.cookie.split(';')) {
        if (item.includes('hl_cred')) {
            this.value = JSON.parse(item.split('=')[1]);
            break;
        } else {
            this.value = null;
        }
      }
  }

  checkValidity() {
    this._http.post('http://localhost:8000/api/checkToken', this.value, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(response => {
        if (!response['approved'] && this.value != null)
            this.destroy();
        });
  }

  checkValidityPost() {
      return this._http.post('http://localhost:8000/api/checkToken', this.value, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  createCookie(data: object ) {
      let d = new Date();
      d.setTime(d.getTime() + (10*24*60*60*1000));
      this.value = {expires : d.toUTCString(),
                    user_id : data['user_id'],
                    token   : data['token']};
      document.cookie = "hl_cred=" + JSON.stringify(this.value)
                                   + "; expires=" + d.toUTCString() + "; path=/;";
      this._router.navigate(["/user"]);
  }

  destroy() {
      this._http.post('http://localhost:8000/api/destroyToken', this.value, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
      document.cookie = "hl_cred=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.value = null;
  }
}
