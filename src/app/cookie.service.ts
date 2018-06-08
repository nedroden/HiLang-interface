import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private http: HttpClient) { }

  getCookie() {
      for (let item of document.cookie.split(';')) {
        if (item.includes('hl_cred'))
            return JSON.parse(item.split('=')[1]);
      }).length;
      return false;
  }

  checkValidity(data: object) {
    return this.http.post('http://localhost:8000/api/checkToken', data, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  createCookie(data: object ) {
      let d = new Date();
      d.setTime(d.getTime() + (10*24*60*60*1000));
      document.cookie = "hl_cred=" + JSON.stringify({"hl_expires" : d.toUTCString(),
                                                     "hl_user_id" : data.user_id,
                                                     "hl_token"   : data.token})
                                   + "; expires=" + d.toUTCString() + "; path=/;";
      window.location.href = "/user";
  }

  destroy() {
      document.cookie = "hl_cred=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      window.location.href = "/login";
  }
}
