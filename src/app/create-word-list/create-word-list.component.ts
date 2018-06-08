import { Component, OnInit } from '@angular/core';
import { LessonService } from '../lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

	number = 5;
	data;
	private course_id: number;

    constructor(private _lesson: LessonService, private _activatedRoute: ActivatedRoute) { 
    }

    ngOnInit() {
    	this._activatedRoute.params.subscribe(params => this.course_id = params.id); 
	   	this.addOnClick();
    	this.createRows();
    }

    addOnClick(){
       	var addRowsButton = document.getElementById("addRowsButton");
    	addRowsButton.onclick = this.createRows.bind(this);

    	var saveButton = document.getElementById("saveButton");
    	saveButton.onclick = this.getData.bind(this);

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

	getData(){
    	this.data = {}
		var table = document.getElementById("input_field") as HTMLTableElement
		var rowLength = table.rows.length
		
		var lessonTitle = (<HTMLInputElement>document.getElementById("inputTitle")).value
		this.data['title'] = lessonTitle
		var lessonCategory = (<HTMLInputElement>document.getElementById("inputCategory")).value
		this.data['category'] = lessonCategory
		var lessonDescription = (<HTMLInputElement>document.getElementById("inputDescription")).value
		this.data['description'] = lessonDescription
		var lessonGrammar = (<HTMLInputElement>document.getElementById("inputGrammar")).value
		this.data['grammar'] = lessonGrammar

		this.data['course_id'] = this.course_id
		
		this.data['words'] = {}


		for(let i = 1; i < rowLength; i++){
			var cells = table.rows.item(i).cells
			var word1 = (<HTMLInputElement>cells.item(1).children[0]).value
			var word2 = (<HTMLInputElement>cells.item(2).children[0]).value
			if(word1 != undefined && word2 != undefined && word1 != "" && word2 != ""){
				this.data.words[word1] = word2
			}
		}
		console.log(this.data)
		this._lesson.postLessonData(this.data, this.course_id).subscribe(response=> console.log(response));
	}


	saveList(){
		console.log("Saved your file");
	}
}
