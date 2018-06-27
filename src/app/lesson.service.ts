import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HilangApiService } from './hilang-api.service';
import { Lesson } from './structures/lesson';
import { CookieService } from './cookie.service';

@Injectable({
    providedIn: 'root'
})
export class LessonService {

  constructor(private _http: HttpClient, private _api: HilangApiService, private _cookie: CookieService) { }

    public getLesson(id: number): Observable<Lesson> {
      	 let data = {
        	    user_id: this._cookie.getValue()['user_id'],
        	    token: this._cookie.getValue()['token'],
        	    params: {id: id}
        	}
          return this._http.post<Lesson>('/lesson/' + id, data);
      }

    public getSentenceLesson(id: number) {//: Observable<Lesson> {
        return this._api.call('/course/' + id + '/get_questions', {});
    }

    postLessonData(lessonData, course_id) {
    	return this._api.call('/course/' + course_id + '/create-lesson', lessonData);
    }

    getLessonLanguages(course_id: number) {
        return this._api.call('/course/' + course_id + '/languages', {});
    }

    setLessonCompleted(sendData) {
        return this._api.call('/lesson/' + sendData['user_id'] + '/' + sendData['lesson_id'] + '/completed', sendData);
    }

    getCompletedLessons(userData) {
        return this._api.call('/lesson/' + userData['user_id'] + '/getcompleted', userData);
    }
}
