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
          return this._http.post<Lesson>('http://localhost:8000/api/lesson/' + id, data);
      }

    public getSentenceLesson(id: number) {//: Observable<Lesson> {
        return this._api.call('http://localhost:8000/api/course/' + id + '/get_questions', {});
    }

    postLessonData(lessonData, course_id) {
    	return this._api.call('http://localhost:8000/api/course/' + course_id + '/create-lesson', lessonData);
    }

    getLessonLanguages(course_id: number) {
        console.log(course_id);
        return this._api.call('http://localhost:8000/api/course/' + course_id + '/languages', {});
    }
}
