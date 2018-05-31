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

  getPublicCourses() {
	return this.http.get('http://localhost:8000/api/courses/public');
  }

  getCourseByLang(id: number) {
  	return this.http.get('http://localhost:8000/api/course/language/' + id + '/');
  }

  getLangDetails(lang_id: number) {
  	return this.http.get('http://localhost:8000/api/language/' + lang_id);
  }

  getSubCourses(u_id: number) {
  	return this.http.get('http://localhost:8000/api/user/subscriptions/' + u_id + '/');
  }

  createCourse(courseData) {
	  // TODO: Update with session data
	  let testData = {name: courseData.name,
  					  user: 1}
	  return this.http.post('http://localhost:8000/api/course/create/', testData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}
