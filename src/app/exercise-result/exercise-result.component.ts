import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ExerciseResult } from '../structures/exerciseresult';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {

    result: ExerciseResult;

    constructor(private _exerciseService: ExerciseService) {
        this.result = this._exerciseService.getResults();
    }

    ngOnInit() {
        
    }
}
