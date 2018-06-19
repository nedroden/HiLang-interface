import { Exercise } from '../../exercise';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HilangApiService } from '../../hilang-api.service';
import { ExerciceService } from '../../exercise.service';
import { SentenceStructureAnswer, SentenceStructureQuestion } from '../../SentenceStructure';

@Component({
  selector: 'app-sentencestructure',
  templateUrl: './sentencestructure.component.html',
  styleUrls: ['./sentencestructure.component.css']
})

export class SentenceStructureComponent implements OnInit extends Exercise {

  private questions : SentenceStructureQuestion[];
  private finishedQuestions: SentenceStructureQuestion[];
  private currentQuestion: SentenceStructureQuestion;
  private placedAnswers: SentenceStructureAnswer[];
  private availableAnswers: SentenceStructureAnswer[];

  constructor(private _api: HilangApiService, private _router: Router, private _exerciseService : ExerciceService) {
      super(_exerciseService, _router);
  }

  ngOnInit() {
    this.currentQuestion = {
                            id: '',
                            native: '',
                            options: [],
                        };
    this.questions = [];
    this._api.call('http://localhost:8000/api/course/' + '34' + '/get_questions', {}).subscribe(data => {
        for (let x = 0; x < data['length']; x++) {
            let question = data[x];
            let newQuestion = {
                                id: question.pk,
                                native: question.fields.native,
                                options: [],
                            };
            let options = question.fields.translation.split(' ');
            for (let key in options) {
                newQuestion.options.push({id: key, value: options[key]});
            }
            this.questions.push(newQuestion)
        }
        this.questions = this.shuffle(this.questions);
        this.nextTurn();
    });
  }

  nextTurn() {
      this.currentQuestion = this.questions[0];
      this.finishedQuestions = this.questions.splice(0, 1);
      this.placedAnswers = [];
      this.availableAnswers = this.shuffle(this.currentQuestion.options);
  }

  answer() {
      // if (this.availableAnswers.length > 0) {
      //
      // }
      if (this.questions.length)
        this.nextTurn();
      else
        alert("Oefening is klaar");
  }

  toPlaced(index: number): void {
      this.placedAnswers.push(this.availableAnswers.splice(index, 1)[0]);
  }

  toAvailable(index: number): void {
      this.availableAnswers.push(this.placedAnswers.splice(index, 1)[0]);
  }

  shuffle(array: []): void {
      var original = array.slice(0);
        var m = array.length, t, i;
        while (m) {
        i = Math.floor(Math.random() * m--);
        array[m] = [array[i] array[i]=array[m]][0];
        }
        if (array == original) {
          array = shuffle(array);
        }
      return array;
  }
}
