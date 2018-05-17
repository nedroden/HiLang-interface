import { Component, OnInit } from '@angular/core';
import { SentenceStructureAnswer } from '../../SentenceStructureAnswer';

@Component({
  selector: 'app-sentencestructure',
  templateUrl: './sentencestructure.component.html',
  styleUrls: ['./sentencestructure.component.css']
})

export class SentenceStructureComponent implements OnInit {

  placedAnswers: SentenceStructureAnswer[];
  availableAnswers: SentenceStructureAnswer[];

  constructor() { }

  ngOnInit() {
    this.placedAnswers = [];
    this.availableAnswers = [{id: 1, value: "I"},
                             {id: 2, value: "want to"},
                             {id: 3, value: "ride"},
                             {id: 4, value: "my bicycle"}];
  }

  toPlaced(index: number): void {
      this.placedAnswers.push(this.availableAnswers.splice(index, 1)[0]);
  }

  toAvailable(index: number): void {
      this.availableAnswers.push(this.placedAnswers.splice(index, 1)[0]);
  }
}
