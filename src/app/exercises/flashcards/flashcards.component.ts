import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent extends Exercise implements OnInit {

    id: number;
    lesson: Lesson;

    constructor(private _lessonService: LessonService,
                private _activatedRoute: ActivatedRoute) {
        super();
        this.lesson = new Lesson;
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => this.id = params.id);

        this._lessonService.getLesson(this.id).subscribe(lesson => {
            this.lesson = lesson[0];
            this.vocabulary = this.lesson.vocabulary;
            this.initialize();
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

        setTimeout(() => {
            input.classList.remove(className);
            input.disabled = false;

            exercise.clear(isCorrect, input);
            exercise.next();
        }, exercise.timeout);
    }
}
