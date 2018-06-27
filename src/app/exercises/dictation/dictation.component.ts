import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../exercise';
import { ExerciseService } from '../../exercise.service';


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

    constructor(private lessonService: LessonService, private activatedRoute: ActivatedRoute, router: Router, exerciseService: ExerciseService) {
      super(exerciseService, router);
    }
  
    ngOnInit() {
      this.lesson = new Lesson;
      this.activatedRoute.params.subscribe(params => this.id = params.id);
      var msg = new SpeechSynthesisUtterance('Hostia, me cago en ti');
      msg.lang = 'es';
		window.speechSynthesis.speak(msg);
      this.lessonService.getLesson(this.id).subscribe(lesson => {
        this.lesson = lesson;
        this.exerciseService.setVocabulary(this.lesson.vocabulary);
        this.initialize(lesson);
      });

      document.getElementById('enterAnswer').addEventListener('click', e => this.handleInput(e, this));
    }

    private handleInput(event, exercise): void {
     
    }
}