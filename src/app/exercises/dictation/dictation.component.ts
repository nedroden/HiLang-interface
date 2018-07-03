import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';
import { HilangApiService } from '../../hilang-api.service';
import { CookieService } from '../../cookie.service';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrls: ['./dictation.component.css']
})

export class DictationComponent extends Exercise implements OnInit {
    id: number;
    lesson: Lesson;
    correctAnswer: string;
    question: string;
    nativeName: string;
    transName: string;

    message;


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
      });
   		document.getElementById('enterAnswer').addEventListener('click', e => this.handleInput(e, this));
    }

     protected initialize(lesson: Lesson){
		this.initQueue();
        this.allWords = this.queue.slice(0);
        this.currentWord = this.queue[0];
        this.message = this.currentWord.translation;
	  	this.repeat();
        this.startTimer();
        this.exerciseService.setLesson(lesson);
    }

    private handleInput(event, exercise): void {
        event.preventDefault();

        let input = <HTMLInputElement>document.getElementById('answer');
        let isCorrect = exercise.isCorrect(input.value);
        let className = isCorrect ? 'correct' : 'incorrect';

        input.classList.add(className);
        input.disabled = true;
        input.blur();

        var correct_answer = document.getElementById('correctAnswer');

        if (!isCorrect && correct_answer !== null){
            correct_answer.innerHTML = '<strong>Correct answer:</strong> ' + exercise.currentWord.translation;
        }

        let timeout: Function = () => {
            input.classList.remove(className);
            input.disabled = false;

            exercise.clear(isCorrect, input);
            exercise.next();
            this.updateMessage();
            this.repeat();

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


  	private updateMessage(){
  		this.message = this.currentWord.translation;
  	}

    private repeat(){
    	var msg = new SpeechSynthesisUtterance(this.message);
    	msg.lang = this.lesson['short_name'];
		window.speechSynthesis.speak(msg);
    }
}
