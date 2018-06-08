import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { interval, pipe } from 'rxjs';
import { concatMap } from 'rxjs/operators';


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
  	return interval(500).pipe(
  			//replace 1 in url with user id
  			concatMap(() =>this.http.get('http://localhost:8000/api/course/1/' + c_id + '/'))
  		);
  }

  getCourseLessons(c_id: number) {
  	return this.http.get('http://localhost:8000/api/course/' + c_id + '/lessons');
  }

  getLessonDet(l_id: number) {
  	return interval(5000).pipe(
  		concatMap(() => this.http.get('http://localhost:8000/api/lesson/' + l_id + '/details'))
  	);
  }

  getLesson(l_id: number) {
  	return interval(5000).pipe(
  		concatMap(() => this.http.get('http://localhost:8000/api/lesson/' + l_id))
  	);
  }

  getLangDetails(lang_id: number) {
  	return this.http.get('http://localhost:8000/api/language/' + lang_id + '/');
  }

  getLanguages() {
  	return this.http.get('http://localhost:8000/api/languages');
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
  	return this.http.post('http://localhost:8000/api/course/' + courseData['id'] + '/edit_desc', courseData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  editLessonDesc(lessonData) {
  	return this.http.post('http://localhost:8000/api/lesson/' + lessonData['id'] + '/edit_desc', lessonData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
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

  subscribe(u_id: number, c_id: number) {
  	let subscription = {
  		user: u_id,
  		course: c_id
  	}
  	return this.http.post('http://localhost:8000/api/course/subscribe', subscription, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  unSubscribe(u_id: number, c_id: number) {
  	let subscriptionToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this.http.post('http://localhost:8000/api/course/unsubscribe', subscriptionToDel, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  createCourse(name: String, author: number) {
  	let courseData = {
  		name: name,
  		user: author
  	};
  	return this.http.post('http://localhost:8000/api/course/create/', courseData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getPublicCourses() {
  	return this.http.get('http://localhost:8000/api/courses/public');
  }

  searchForPublicCourse(name: String) {
  	let courseData = {
  		name: name
  	}
  	return this.http.post('http://localhost:8000/api/course/search', courseData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}