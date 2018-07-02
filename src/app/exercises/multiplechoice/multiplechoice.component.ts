import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';
import { HilangApiService } from '../../hilang-api.service';
import { CookieService } from '../../cookie.service';

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.css']
})
export class MultipleChoiceComponent extends Exercise implements OnInit {

    id: number;
    lesson: Lesson;
    answers = [];

    constructor(private _lessonService: LessonService,
                private _activatedRoute: ActivatedRoute,
                router: Router,
                exerciseService: ExerciseService,
                api: HilangApiService,
                cookie: CookieService) {
        super(exerciseService, router, api, cookie);

    }

    ngOnInit() {
        this.lesson = new Lesson;
        this._activatedRoute.params.subscribe(params => this.id = params.id);
        this._lessonService.getLesson(this.id).subscribe(lesson => {
            this.lesson = lesson;
            this.exerciseService.setVocabulary(this.lesson.vocabulary);
            this.initialize(lesson);
            this.setOptions();
        });
    }

    private setOptions(){
        this.answers = [
            {
                id: 'option-1',
                value: this.currentWord.options[0],
            },
            {
                id: 'option-2',
                value: this.currentWord.options[1],
            },
            {
                id: 'option-3',
                value: this.currentWord.options[2],
            },
            {
                id: 'option-4',
                value: this.currentWord.options[3],
            }
        ]
    }


    private disableButtons(){
        for(let i = 1; i < 5; i++){
            (<HTMLInputElement>document.getElementById('option-' + i)).disabled = true;
        }
    }

    private handleInput(event, id, exercise){
        this.disableButtons();

        let btn = document.getElementById(id);
        let input = this.answers[id[7]-1].value;

        let isCorrect = this.isCorrect(input);

        let className = isCorrect ? 'correct' : 'incorrect';

        if(!isCorrect){
            for(let i = 1; i < 5; i++){
                let option = (<HTMLInputElement>document.getElementById('option-' + i));
                if(option.value === this.getCorrectValue()){
                    option.classList.add('correct');
                }
            }
        }

        btn.classList.add(className);
        console.log(isCorrect);

        let timeout: Function = () => {
            btn.classList.remove(className);

            this.clear(isCorrect, (<HTMLInputElement>btn));
            this.next();
            this.setOptions()
            window.clearInterval(interval);
        };

        let timeoutValue = this.getTimeout(isCorrect);
        let interval = window.setInterval(() => {
            if (timeoutValue <= 10) {
                timeout();
                return;
            }
            else
                timeoutValue -= 10;
        }, 10);
    }
}
