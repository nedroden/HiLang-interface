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
}
