import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HilangApiService } from './hilang-api.service';
import { CookieService } from './cookie.service';
import { interval, pipe } from 'rxjs';
import { concatMap } from 'rxjs/operators';


@Injectable()
export class CourseService {

  constructor(private _api: HilangApiService, private _cookies: CookieService) { }

  getCourses() {
  	return this._api.call('http://localhost:8000/api/courses', {});
  }

  getCourseByLang(id: number) {
  	return this._api.call('http://localhost:8000/api/course/language/' + id + '/', {});
  }

  getCourseDetails(c_id: number) {
  	return this._api.call('http://localhost:8000/api/course/' + c_id + '/', {});
  }

  getCourseLessons(c_id: number) {
  	return this._api.call('http://localhost:8000/api/course/' + c_id + '/lessons', {});
  }

  getLessonDet(l_id: number) {
  	return interval(500).pipe(
  		concatMap(() => this._api.call('http://localhost:8000/api/lesson/' + l_id + '/details', {}))
  	);
  }

  getLesson(l_id: number) {
  	return interval(500).pipe(
  		concatMap(() => this._api.call('http://localhost:8000/api/lesson/' + l_id, {}))
  	);
  }

  getLangDetails(lang_id: number) {
    if(lang_id === null) {
        lang_id = 7;
    }
  	return this._api.call('http://localhost:8000/api/language/' + lang_id + '/', {});
  }

  getLanguages() {
      return this._api.unsafeGet('http://localhost:8000/api/languages/');
  	//return this._api.call('http://localhost:8000/api/languages/', {});
  }

  getSubCourses(u_id: number) {
    return this._api.call('http://localhost:8000/api/user/subscriptions/' + u_id + '/', {});
  }

  getFavCourses(u_id: number) {
    return this._api.call('http://localhost:8000/api/user/favorites/' + u_id + '/', {});
  }

  getUserCourses(u_id: number) {
    return this._api.call('http://localhost:8000/api/courses/' + u_id + '/', {});
  }

  editCourseDesc(courseData) {
  	return this._api.call('http://localhost:8000/api/course/' + courseData['id'] + '/edit_desc', courseData);
  }

  editCourseLang(courseData) {
    return this._api.call('http://localhost:8000/api/course/' + courseData['id'] + '/edit_lang', courseData);
  }

  editLessonDesc(lessonData) {
  	return this._api.call('http://localhost:8000/api/lesson/' + lessonData['id'] + '/edit_desc', lessonData);
  }

  getUser(u_id: number) {
  	return this._api.call('http://localhost:8000/api/user/' + u_id + '/', {});
  }

  addFavorite(u_id: number, c_id: number) {
  	let favorite = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('http://localhost:8000/api/course/favorite', favorite);
  }

  delFavorite(u_id: number, c_id: number) {
  	let favoriteToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('http://localhost:8000/api/course/unfavorite', favoriteToDel);
  }

  subscribe(u_id: number, c_id: number) {
  	let subscription = {
  		user: u_id,
  		course: c_id
  	}
  	return this._api.call('http://localhost:8000/api/course/subscribe', subscription);
  }

  unSubscribe(u_id: number, c_id: number) {
  	let subscriptionToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('http://localhost:8000/api/course/unsubscribe', subscriptionToDel);
  }


  createCourse(courseData) {
    //replace native_lang with interface language
	let testData = {name: courseData.name,
  				    user: this._cookies.getValue()['user_id'],
                    native_lang: 2,
                    trans_lang: 7}
	return this._api.call('http://localhost:8000/api/course/create/', testData);

  }

  getPublicCourses() {
  	return this._api.call('http://localhost:8000/api/courses/public', {});
  }

  searchForPublicCourse(name: String) {
  	let courseData = {
  		name: name
  	}
  	return this._api.call    ('http://localhost:8000/api/course/search', courseData);
  }
}
