import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LessonService {

 	constructor(private http: HttpClient) {
	}

	postLessonData(lessonData, course_id) {
		return this.http.post('http://localhost:8000/api/course/' + course_id + '/create-lesson', lessonData, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})});
	}
}