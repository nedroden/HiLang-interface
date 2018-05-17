import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessonview',
  templateUrl: './lessonview.component.html',
  styleUrls: ['./lessonview.component.css']
})
export class LessonviewComponent implements OnInit {

    lesson = {
        number: 1,
        title: "Welcome to France",
        source_language: "English",
        target_language: "French",
        vocabulary: [
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
        ],
        author: {
            avatar: "http://cdn.guardian.ng/wp-content/uploads/2016/05/Vladimir-Putin.jpg",
            about: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    }

    constructor() { }

    ngOnInit() {
    }
}
