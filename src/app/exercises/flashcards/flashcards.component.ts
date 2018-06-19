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

        if (!isCorrect)
            document.getElementById('correct_answer').innerHTML = '<strong>Correct answer:</strong> ' + exercise.currentWord.translation.replace(/<(?:.|\n)*?>/gm, '');

        setTimeout(() => {
            input.classList.remove(className);
            input.disabled = false;

            exercise.clear(isCorrect, input);
            exercise.next();
            document.getElementById('correct_answer').innerHTML = '';
        }, exercise.getTimeout(isCorrect));
    }
}
