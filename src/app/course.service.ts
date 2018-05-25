import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const headers = new HttpHeaders();
headers.set('Content-Type', 'application/json; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
  	return this.http.get('http://localhost:8000/api/courses' {headers: headers})
  }
}
