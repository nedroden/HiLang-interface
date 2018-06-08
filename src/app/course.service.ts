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
  	return this.http.get('http://localhost:8000/api/course/language/' + id + '/');
  }

  getCourseDetails(c_id: number) {
  	return this.http.get('http://localhost:8000/api/course/1/' + c_id + '/');
  }

  getCourseLessons(c_id: number) {
  	return this.http.get('http://localhost:8000/api/course/' + c_id + '/lessons');
  }

  getLangDetails(lang_id: number) {
  	return this.http.get('http://localhost:8000/api/language/' + lang_id + '/');
  }

  getSubCourses(u_id: number) {
  	return this.http.get('http://localhost:8000/api/user/subscriptions/' + u_id + '/');
  }

  getFavCourses(u_id: number) {
  	return this.http.get('http://localhost:8000/api/user/favorites/' + u_id + '/');
  }

  getUserCourses(u_id: number) {
  	return this.http.get('http://localhost:8000/api/courses/' + u_id + '/');
  }

  editCourseDesc(courseData) {
  	return this.http.post('http://localhost:8000/api/course/' + courseData['id'] + "/edit_desc", courseData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getUser(u_id: number) {
  	return this.http.get('http://localhost:8000/api/user/' + u_id + '/');
  }

  addFavorite(u_id: number, c_id: number) {
  	let favorite = {
  		user: u_id,
  		course: c_id
  	};
  	return this.http.post('http://localhost:8000/api/course/favorite', favorite, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  delFavorite(u_id: number, c_id: number) {
  	let favoriteToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this.http.post('http://localhost:8000/api/course/unfavorite', favoriteToDel, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  createCourse(courseData) {
	  // TODO: Update with session data
	  let testData = {name: courseData.name,
  					  user: 1}
	  return this.http.post('http://localhost:8000/api/course/create/', testData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  getPublicCourses() {
  	return this.http.get('http://localhost:8000/api/courses/public');
  }
}