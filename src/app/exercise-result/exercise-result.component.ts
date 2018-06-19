import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { ExerciseResult } from '../structures/exerciseresult';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {

    result: ExerciseResult;

    constructor(private _exerciseService: ExerciseService, private _route: Router) {
        this.result = this._exerciseService.getResults();
        this._exerciseService.clearResults();

        if (this.result.lesson === undefined)
            this._route.navigate(['/user']);
    }

    ngOnInit() {
    }
}
