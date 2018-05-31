import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class LoginService {
  private course: object;

  constructor(private http: HttpClient) { }
    postLoginData(loginData) {
        return this.http.post('http://localhost:8000/api/login', loginData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
    }
}
