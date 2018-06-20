import { Exercise } from '../../exercise';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HilangApiService } from '../../hilang-api.service';
import { ExerciseService } from '../../exercise.service';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { Flashcard } from '../../structures/flashcard';

@Component({
  selector: 'app-sentencestructure',
  templateUrl: './sentencestructure.component.html',
  styleUrls: ['./sentencestructure.component.css']
})

export class SentenceStructureComponent extends Exercise implements OnInit {

  private id: number;
  private placedAnswers = [];
  private availableAnswers = [];
  private lesson: Lesson;

  constructor(private _api: HilangApiService,
              private _router: Router,
              private _exerciseService : ExerciseService,
              private _activatedRoute: ActivatedRoute,
              private _lessonService: LessonService) {
      super(_exerciseService, _router);
      this.currentWord = new Flashcard();
  }

  ngOnInit() {
    this.lesson = new Lesson;
    this._activatedRoute.params.subscribe(params => this.id = params.id);

    this._lessonService.getLesson(this.id).subscribe(lesson => {
        this.lesson = lesson;
        this.exerciseService.setVocabulary(this.lesson.vocabulary);
        this.initialize(lesson);
    });

    document.getElementById('answer').addEventListener('click', e => this.handleInput(e, this));
  }

  protected initialize(lesson: Lesson): void {
      this._api.call('http://localhost:8000/api/course/' + '34' + '/get_questions', {}).subscribe(data => {
          for (let x = 0; x < data['length']; x++) {
              let question = data[x];
              let newQuestion = <Flashcard>{
                                    id: question.pk,
                                    native: question.fields.native,
                                    translation: question.fields.translation,
                                    options: [],
                                };
              let options = question.fields.translation.split(' ');
              for (let key in options) {
                  newQuestion.options.push({id: key, value: options[key]});
              }
              this.queue.push(newQuestion);
          }
          this.queue = this.queue.sort((a, b) => 0.5 - Math.random());
          this.currentWord = this.queue[0];
          this.placedAnswers = [];
          this.availableAnswers = this.currentWord.options.sort((a, b) => 0.5 - Math.random());
          this.startTimer();
      });

      this.currentWord = new Flashcard();
      this.exerciseService.setLesson(lesson);
  }

  private handleInput(event, exercise): void {
      event.preventDefault();

      let isCorrect = true;
      exercise.clear(true, null);
      exercise.next();
      this.placedAnswers = [];
      this.availableAnswers = this.currentWord.options.sort((a, b) => 0.5 - Math.random());
  }

  toPlaced(index: number): void {
      this.placedAnswers.push(this.availableAnswers.splice(index, 1)[0]);
  }

  toAvailable(index: number): void {
      this.availableAnswers.push(this.placedAnswers.splice(index, 1)[0]);
  }
}
