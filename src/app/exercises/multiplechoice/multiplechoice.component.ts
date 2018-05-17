import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.css']
})
export class MultipleChoiceComponent implements OnInit {

    answers = [
        {
            index: 1,
            value: 'Fiets'
        },
        {
            index: 2,
            value: 'Fietsen'
        },
        {
            index: 3,
            value: 'Fietst'
        },
        {
            index: 4,
            value: 'Fietshaha'
        }
    ]

    constructor() { }

    ngOnInit() {
    }
}
