import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessonview',
  templateUrl: './lessonview.component.html',
  styleUrls: ['./lessonview.component.css']
})
export class LessonviewComponent implements OnInit {

    vocabulary = [
        {
            index: 0,
            native: "Would you like to dance with me?",
            foreign: "L'omelette du fromage?"
        },
        {
            index: 1,
            native: "You are a nice person.",
            foreign: "Je pense que tu es très gros."
        },
        {
            index: 2,
            native: "Intelligent",
            foreign: "Stupide"
        },
        {
            index: 3,
            native: "The son",
            foreign: "Le bâtard"
        },
        {
            index: 4,
            native: "The girl",
            foreign: "La poisson"
        }
    ]

    constructor() { }

    ngOnInit() {
    }
}
