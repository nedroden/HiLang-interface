import { Component, OnInit } from '@angular/core';
import { LessonService } from '../lesson.service';
import { HilangApiService } from '../hilang-api.service';
import { LessonDetailsService } from '../lesson-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

	number = 5;
	data;
	private course_id: number;
    details;
    private types;
    private lesson_id: number;

    constructor(private _lesson: LessonService, private _activatedRoute: ActivatedRoute, private _api: HilangApiService, private lesDetService: LessonDetailsService, private router: Router) {
    }

    ngOnInit() {
    	this._activatedRoute.params.subscribe(params => this.course_id = params.id);
	   	this.addOnClick();
    	this.createRows();
        this._api.call('http://localhost:8000/api/lessontypes', {}).subscribe(data => {
            this.types = data;
        });

    	this.details = this.lesDetService.getDetails();

    	this.lesDetService.emptyDetails();
    	this.addExistingData(this.details);
    }

    addExistingData(details) {
    	if(details['id'] != "") {
    		this.lesson_id = details['id'];
    		(<HTMLInputElement>document.getElementById('inputTitle')).value = details['name'];
    		(<HTMLInputElement>document.getElementById('inputCategory')).value = details['category'];
    		(<HTMLInputElement>document.getElementById('inputDescription')).value = details['description'];
    		(<HTMLInputElement>document.getElementById('inputGrammar')).value = details['grammar'];
    		let vocabulary = details['vocabulary'];
    		console.log(vocabulary);
    		for(let i=5; i<vocabulary.length; i+=5) {
    			this.createRows();
    		}
    		let table = document.getElementById("input_field") as HTMLTableElement
    		let rowLength = table.rows.length
    		for(let i = 0; i < vocabulary.length; i++){
				let cells = table.rows.item(i+1).cells;
				(<HTMLInputElement>cells.item(1).children[0]).value = vocabulary[i].native;
				(<HTMLInputElement>cells.item(2).children[0]).value = vocabulary[i].translation;
			}
    	}
    }

    addOnClick(){
       	var addRowsButton = document.getElementById("addRowsButton");
    	addRowsButton.onclick = this.createRows.bind(this);

    	var saveButton = document.getElementById("saveButton");
    	saveButton.onclick = this.handleData.bind(this);
    }

	createRows(){
		for(let x = 0; x < 5; x ++){

			var table = document.getElementById("input_field") as HTMLTableElement;
			var i = table.getElementsByTagName("tr").length;
			var row = table.insertRow(i);

			var cell1 = row.insertCell(0);
			var newDiv = document.createElement("span");
			newDiv.classList.add("input-group-text");
			newDiv.id = "basic-addon1";
			newDiv.innerHTML = "" + (i -1);
			cell1.appendChild(newDiv);

			var cell2 = row.insertCell(1);
			var cell2_input = document.createElement("input");
			cell2_input.classList.add("form-control");
			cell2.appendChild(cell2_input);

			var cell3 = row.insertCell(2);
			var cell3_input = document.createElement("input");
			cell3_input.classList.add("form-control");
			cell3.appendChild(cell3_input);

		}
	}

	handleData(){
    	this.data = {};
		var table = document.getElementById("input_field") as HTMLTableElement;
		var rowLength = table.rows.length;
        var lessonTitle = (<HTMLInputElement>document.getElementById("inputTitle")).value;
		this.data['title'] = lessonTitle;
		var lessonCategory = (<HTMLInputElement>document.getElementById("inputCategory")).value;
		this.data['category'] = lessonCategory;
		var lessonDescription = (<HTMLInputElement>document.getElementById("inputDescription")).value;
		this.data['description'] = lessonDescription;
		var lessonGrammar = (<HTMLInputElement>document.getElementById("inputGrammar")).value;
		this.data['grammar'] = lessonGrammar;
		this.data['course_id'] = this.course_id;
        this.data['lessonType'] = (<HTMLSelectElement>document.getElementById("inputExerciseType")).value;
		this.data['words'] = {};

		for(let i = 1; i < rowLength; i++){
			var cells = table.rows.item(i).cells;
			var word1 = (<HTMLInputElement>cells.item(1).children[0]).value;
			var word2 = (<HTMLInputElement>cells.item(2).children[0]).value;
			if(word1 != undefined && word2 != undefined && word1 != "" && word2 != ""){
				this.data.words[word1] = word2;
			}
		}
        if (this.data['title'] != "" &&
            this.data['category'] != "" &&
            this.data['description'] != "" &&
            this.data['course_id'] != "" &&
            this.data['lessonType'] != "" &&
            this.data['words'] != "") {
    		this._lesson.postLessonData(this.data, this.course_id).subscribe(response => {
                console.log(response);
                if (response['length'] > 0)
                    console.log("DEZE DOET HET, JE MAG DE GEBRUIKER DOORSTUREN");
                    this.router.navigate(['user/course/' + this.course_id]);
            });
        } else {
            alert("Vul alle velden in!");
        }
	}
}
