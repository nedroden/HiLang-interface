import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';
import { HilangApiService } from '../../hilang-api.service';
import { CookieService } from '../../cookie.service';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent extends Exercise implements OnInit {
    id: number;
    lesson: Lesson;
    correctAnswer: string;
    question: string;
    nativeName: string;
    transName: string;

    constructor(private lessonService: LessonService,
                private activatedRoute: ActivatedRoute,
                        router: Router,
                        exerciseService: ExerciseService,
                        api: HilangApiService,
                        cookie: CookieService) {
      super(exerciseService, router, api, cookie);
    }

    ngOnInit() {
      this.lesson = new Lesson;
      this.activatedRoute.params.subscribe(params => this.id = params.id);

      this.lessonService.getLesson(this.id).subscribe(lesson => {
        this.lesson = lesson;
        this.exerciseService.setVocabulary(this.lesson.vocabulary);
        this.initialize(lesson);
        this.makeIncomplete(this.currentWord)
      });

      document.getElementById('enterAnswer').addEventListener('click', e => this.handleInput(e, this));
    }

    makeIncomplete(currentWord) {
      let question = ""
      for(let index = 0; index < currentWord.translation.length; index++) {
        if(currentWord.translation[index] == ' '){
          question += " ";
          continue;
        }
        if(index != 0 && index != currentWord.translation.length -1 && index != Math.floor(currentWord.translation.length / 2)) {
          question += ".";

        } else {
          question += currentWord.translation[index];
        }
      }
      this.correctAnswer = currentWord.translation;
      this.question = question;
    }

    private handleInput(event, exercise): void {
      event.preventDefault();
      let answer = (<HTMLInputElement>document.getElementById('answer'));
      let isCorrect = (exercise.isCorrect(answer.value));
      let className = isCorrect ? 'correct' : 'incorrect';

        answer.classList.add(className);
        answer.disabled = true;

      if(!isCorrect) {
        document.getElementById('correctAnswer').innerHTML = '<strong>Correct answer: </strong>' + this.correctAnswer;
      }

      setTimeout(() => {
        answer.classList.remove(className);
            answer.disabled = false;

            exercise.clear(isCorrect, answer);
            exercise.next();
            this.makeIncomplete(exercise.currentWord);

        document.getElementById('correctAnswer').innerHTML = "";
      }, exercise.getTimeout(isCorrect));
    }
}
