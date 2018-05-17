import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {

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
