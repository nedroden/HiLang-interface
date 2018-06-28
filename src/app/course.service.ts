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
  	return this._api.call('/courses', {});
  }

  getCourseByLang(id: number) {
  	return this._api.call('/course/language/' + id + '/', {});
  }

  updateCourse(data: object) {
      return this._api.call('/course/update/', data);
  }

  getCourseDetails(c_id: number) {
  	return this._api.call('/course/' + c_id + '/', {});
  }

  getCourseLessons(c_id: number) {
  	return this._api.call('/course/' + c_id + '/lessons', {});
  }

  getLessonDet(l_id: number) {
  	return this._api.call('/lesson/' + l_id + '/details', {});
  }

  getLesson(l_id: number) {
  	return this._api.call('/lesson/' + l_id, {});
  }

  getLangDetails(lang_id: number) {
    if(lang_id === null) {
        lang_id = 7;
    }
  	return this._api.call('/language/' + lang_id + '/', {});
  }

  getLanguages() {
    return this._api.unsafeGet('/languages/');
  }

  getSubCourses(u_id: number) {
    return this._api.call('/user/subscriptions/' + u_id + '/', {});
  }

  getFavCourses(u_id: number) {
    return this._api.call('/user/favorites/' + u_id + '/', {});
  }

  getUserCourses(u_id: number) {
    return this._api.call('/courses/' + u_id + '/', {});
  }

  editCourseDesc(courseData) {
  	return this._api.call('/course/' + courseData['id'] + '/edit_desc', courseData);
  }

  editCourseLang(courseData) {
    return this._api.call('/course/' + courseData['id'] + '/edit_lang', courseData);
  }

  editLessonDesc(lessonData) {
  	return this._api.call('/lesson/' + lessonData['id'] + '/edit_desc', lessonData);
  }

  getUser(u_id: number) {
  	return this._api.call('/user/' + u_id + '/', {});
  }

  addFavorite(u_id: number, c_id: number) {
  	let favorite = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('/course/favorite', favorite);
  }

  delFavorite(u_id: number, c_id: number) {
  	let favoriteToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('/course/unfavorite', favoriteToDel);
  }

  delCourse(c_id: number) {
      return this._api.call('/course/' + c_id + '/delete/', {});
  }

  delLesson(l_id: number) {
      return this._api.call('/lesson/' + l_id + '/delete/', {});
  }

  subscribe(u_id: number, c_id: number) {
  	let subscription = {
  		user: u_id,
  		course: c_id
  	}
  	return this._api.call('/course/subscribe', subscription);
  }

  unSubscribe(u_id: number, c_id: number) {
  	let subscriptionToDel = {
  		user: u_id,
  		course: c_id
  	};
  	return this._api.call('/course/unsubscribe', subscriptionToDel);
  }


  createCourse(courseData) {
    //replace native_lang with interface language
	let testData = {name: courseData.name,
  				    user: this._cookies.getValue()['user_id'],
                    native_lang: courseData.nativeLang,
                    trans_lang: courseData.targetLang}
	return this._api.call('/course/create/', testData);

  }

  getPublicCourses() {
  	return this._api.call('/courses/public', {});
  }

  searchForPublicCourse(name: String) {
  	let courseData = {
  		name: name
  	}
  	return this._api.call('/course/search', courseData);
  }
}
