import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {

    constructor(private _exerciseService: ExerciseService) { }

    ngOnInit() {
        console.log(this._exerciseService.getVocabulary());
    }
}
