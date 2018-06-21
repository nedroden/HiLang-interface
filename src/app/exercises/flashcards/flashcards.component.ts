import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent extends Exercise implements OnInit {

    id: number;
    lesson: Lesson;

    constructor(private _lessonService: LessonService,
                private _activatedRoute: ActivatedRoute,
                router: Router,
                exerciseService: ExerciseService) {
        super(exerciseService, router);
    }

    ngOnInit() {
        this.lesson = new Lesson;
        this._activatedRoute.params.subscribe(params => this.id = params.id);

        this._lessonService.getLesson(this.id).subscribe(lesson => {
            this.lesson = lesson;
            this.exerciseService.setVocabulary(this.lesson.vocabulary);
            this.initialize(lesson);
        });

        document.getElementById('enterTranslation').addEventListener('click', e => this.handleInput(e, this));
    }

    private handleInput(event, exercise): void {
        event.preventDefault();

        let input = <HTMLInputElement>document.getElementById('translation');
        let isCorrect = exercise.isCorrect(input.value);
        let className = isCorrect ? 'correct' : 'incorrect';

        input.classList.add(className);
        input.disabled = true;
        input.blur();

        let correct_answer = document.getElementById('correct_answer');

        if (!isCorrect && correct_answer !== null)
            document.getElementById('correct_answer').innerHTML = '<strong>Correct answer:</strong> ' + exercise.currentWord.translation.replace(/<(?:.|\n)*?>/gm, '');

        let timeout: Function = () => {
            input.classList.remove(className);
            input.disabled = false;

            exercise.clear(isCorrect, input);
            exercise.next();

            if (correct_answer !== null)
                correct_answer.innerHTML = '';

            window.removeEventListener('keypress', whatever);
            window.clearInterval(interval);
            input.focus();
        };

        let timeoutValue = exercise.getTimeout(isCorrect);
        let interval = window.setInterval(() => {
            if (timeoutValue <= 10) {
                timeout();
                return;
            }
            else
                timeoutValue -= 10;
        }, 10);

        let whatever = function(event) {
            if ((event.keyCode ? event.keyCode : event.which) == 13) {
                timeout();
                return;
            }
        };

        window.addEventListener('keypress', whatever, false);
    }
}
