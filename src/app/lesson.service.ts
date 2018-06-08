import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson } from './structures/lesson';

@Injectable({
    providedIn: 'root'
})
export class LessonService {

    constructor(private _http: HttpClient) { }

    public getLesson(id: number): Observable<Lesson> {
        return this._http.get<Lesson>('http://localhost:8000/api/lesson/' + id);
    }

	postLessonData(lessonData, course_id) {
		return this._http.post('http://localhost:8000/api/course/' + course_id + '/create-lesson', lessonData, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})});
	}
}