import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { LessonService } from '../lesson.service';
import { CookieService } from '../cookie.service';
import { ExerciseResult } from '../structures/exerciseresult';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {

    result: ExerciseResult;

    constructor(private _exerciseService: ExerciseService, private _route: Router, private _lessonService: LessonService, private _cookie: CookieService) {
        this.result = this._exerciseService.getResults();
        this._exerciseService.clearResults();

        if (this.result.lesson === undefined) {
          this._route.navigate(['/user']);
        }
    }

    ngOnInit() {
      let sendData = {
        user_id: this._cookie.getValue()['user_id'],
        lesson_id: this.result.lesson['id'],
        grade: this.result.grade
      }
      this._lessonService.setLessonCompleted(sendData).subscribe();
    }
}
