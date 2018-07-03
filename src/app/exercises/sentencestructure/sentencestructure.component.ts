import { Exercise } from '../../exercise';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HilangApiService } from '../../hilang-api.service';
import { ExerciseService } from '../../exercise.service';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { CookieService } from '../../cookie.service';
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

  constructor(api: HilangApiService,
              private _router: Router,
              private _exerciseService : ExerciseService,
              private _activatedRoute: ActivatedRoute,
              private _lessonService: LessonService,
              cookie: CookieService) {
      super(_exerciseService, _router, api, cookie);
      this.currentWord = new Flashcard();
  }

  ngOnInit() {
    this.lesson = new Lesson;
    this._activatedRoute.params.subscribe(params => this.id = params.id);
    this.id = 34;
    this._lessonService.getLesson(this.id).subscribe(lesson => {
        this.lesson = lesson;
        this.exerciseService.setVocabulary(this.lesson.vocabulary);
        this.initialize();
    });
    document.getElementById('answer').addEventListener('click', e => this.handleInput(e, this));
  }

  protected initialize(): void {
      this.id = 34;
      this._lessonService.getSentenceLesson(this.id).subscribe(data => {
          this.exerciseService.setVocabulary(this.lesson.vocabulary);

          for (let x = 0; x < data['length']; x++) {
              let question = data[x];
              let newQuestion = <Flashcard>{ id: question.pk,
                                             native: question.fields.native,
                                             translation: question.fields.translation, };
              this.queue.push(newQuestion);
          }
          this.queue = this.queue.sort((a, b) => 0.5 - Math.random());
          this.currentWord = this.queue[0];
          this.placedAnswers = [];
          this.availableAnswers = this.currentWord.translation.split(' ').sort((a, b) => 0.5 - Math.random());
          this.startTimer();
      });

      this.currentWord = new Flashcard();
      this.exerciseService.setLesson(this.lesson);
  }

  private handleInput(event, exercise): void {
      event.preventDefault();
      let isCorrect = false;
      if (this.currentWord.translation == this.placedAnswers.join(' '))
           isCorrect = true;

      exercise.clear(isCorrect, null);
      exercise.next();
      this.placedAnswers = [];
      this.availableAnswers = this.currentWord.translation.split(' ').sort((a, b) => 0.5 - Math.random());
  }

  toPlaced(index: number): void {
      this.placedAnswers.push(this.availableAnswers.splice(index, 1)[0]);
  }

  toAvailable(index: number): void {
      this.availableAnswers.push(this.placedAnswers.splice(index, 1)[0]);
  }
}
