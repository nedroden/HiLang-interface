import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
  	console.log(this.http.get('http://localhost:8000/api/courses'));
  	return this.http.get('http://localhost:8000/api/courses');
  }
}
