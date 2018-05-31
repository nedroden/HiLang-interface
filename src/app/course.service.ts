import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses() {
  	return this.http.get('http://localhost:8000/api/courses');
  }

  getCourseByLang(id: number) {
  	return this.http.get('http://localhost:8000/api/course/language/' + id);
  }

  getLangDetails() {
  	return this.http.get('http://localhost:8000/api/languages/');
  }

  createCourse(courseData) {
	  // TODO: Update with session data
	  let testData = {name: courseData.name,
  					  user: 1}
	  return this.http.post('http://localhost:8000/api/course/create/', testData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}
