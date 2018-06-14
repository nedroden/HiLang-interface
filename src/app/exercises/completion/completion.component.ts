import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../structures/lesson';
import { LessonService } from '../../lesson.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../../exercise';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css']
})
export class CompletionComponent extends Exercise implements OnInit {
	id: number;
	lesson: Lesson;

  	constructor(private lessonService: LessonService, private activatedRoute: ActivatedRoute) {
  		super();
  		this.lesson = new Lesson;
  	}
	
  	ngOnInit() {
  		this.activatedRoute.params.subscribe(params => this.id = params.id);

  		this.lessonService.getLesson(this.id).subscribe(lesson => {
  			this.lesson = lesson[0];
  			this.vocabulary = this.lesson.vocabulary;
  			this.initialize();
  			console.log(this.lesson);
  		});
  	}

}
