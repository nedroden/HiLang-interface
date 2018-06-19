import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pre-exercise',
  templateUrl: './pre-exercise.component.html',
  styleUrls: ['./pre-exercise.component.css']
})
export class PreExerciseComponent implements OnInit {

	lesson_id;

	constructor(private _activatedRoute: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this._activatedRoute.params.subscribe(params => this.lesson_id = params.lesson_id);
		document.getElementById('submit_button').addEventListener('click', e => {
			e.preventDefault();
			this.createExercise();
		});
	}

	createExercise() {
		var exercises = document.getElementsByName("exercise");
		var selectedExercise;

		for(var i = 0; i < exercises.length; i++){
			if(exercises[i].checked){
				selectedExercise = exercises[i].value
			}
		}
		this.router.navigate(["user/lesson/" + this.lesson_id + "/" + selectedExercise])
	}
}
