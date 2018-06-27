import { Component, OnInit } from '@angular/core';
import { LessonService } from '../lesson.service';
import { HilangApiService } from '../hilang-api.service';
import { LessonDetailsService } from '../lesson-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorNotification } from '../utils/errornotification';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

	number = 5;
	private data = {};
	private course_id: number;
    details;
    private types;
    private lesson_id: number;
    private listCounter = 0;

    constructor(private _lesson: LessonService, private _activatedRoute: ActivatedRoute, private _api: HilangApiService, private lesDetService: LessonDetailsService, private router: Router) {
    }

    ngOnInit() {
    	this._activatedRoute.params.subscribe(params => this.course_id = params.id);
	   	this.addOnClick();
    	this.createRows();
        this._api.call('/lessontypes', {}).subscribe(data => {
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
    		if((<HTMLInputElement>document.getElementById('inputGrammar')).value == undefined){
                (<HTMLInputElement>document.getElementById('inputGrammar')).value = details['grammar'];
            }

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
        var table = document.getElementById("input_field") as HTMLTableElement;

		for(let x = 0; x < 5; x ++){
			var i = table.getElementsByTagName("tr").length;
			var row = table.insertRow(i);

			var newDiv = document.createElement("span");
			newDiv.classList.add("input-group-text");
			newDiv.id = "basic-addon1";
			newDiv.innerHTML = "" + (i -1);
			row.insertCell(0).appendChild(newDiv);

			var cell2_input = document.createElement("input");
			cell2_input.classList.add("form-control");
			row.insertCell(1).appendChild(cell2_input);

			var cell3_input = document.createElement("input");
			cell3_input.classList.add("form-control");
            cell3_input.id = "answer_" + (this.listCounter + x);
			row.insertCell(2).appendChild(cell3_input);

            var cell4_input = <HTMLInputElement>document.createElement("input");
            cell4_input.type = "checkbox";
            cell4_input.id = "checkSentence_" + (this.listCounter + x);
            row.insertCell(3).appendChild(cell4_input);
            this.updateCheckbox(cell3_input, this);
		}

        this.listCounter += 5;
	}

    updateCheckbox(element: HTMLInputElement, scope: CreateWordListComponent) {
        element.addEventListener('input', function() {
            document.getElementById("checkSentence_" + element.id.split('_')[1])['checked'] = scope.checkSentence(element.value.split(' '));
        });
    }

    checkSentence(input: string[]) {
        let valid = true;
        if (input.length > 2) {
            input.forEach(function(item) {
                if (item.length < 1) valid = false;
            });
        } else valid = false;
        return valid;
    }

	handleData() {
		var table = document.getElementById("input_field") as HTMLTableElement;
		var rowLength = table.rows.length;
        var data = {
            'title' : (<HTMLInputElement>document.getElementById("inputTitle")).value,
            'category' : (<HTMLInputElement>document.getElementById("inputCategory")).value,
            'description' : (<HTMLInputElement>document.getElementById("inputDescription")).value,
            'grammar' : (<HTMLInputElement>document.getElementById("inputGrammar")).value,
            'course_id' : this.course_id,
            'questions' : [],
        };

        if(this.lesson_id != null) {
            data['lesson_id'] = this.lesson_id;
        } else {
            data['lesson_id'] = "";
        }

        if(data['grammar'] == 'undefined'){
            data['grammar'] = '';
        }

		for(let i = 1; i < rowLength; i++){
			var cells = table.rows.item(i).cells;
			var word2 = (<HTMLInputElement>cells.item(2).children[0]).value;
            var word1 = (<HTMLInputElement>cells.item(1).children[0]).value;

            if (word1 != undefined && word2 != undefined && word1 != "" && word2 != "") {
                data.questions.push({
                    'native' : word1,
                    'translation' : word2,
                    'sentence': (this.checkSentence(word2.split(' '))) ? <HTMLInputElement>cells.item(3).children[0]['checked'] : false,
                });
			}
		}
        if (data['title'] != "" &&
            data['category'] != "" &&
            data['description'] != "" &&
            data['questions'].length > 0) {
    		this._lesson.postLessonData(data, this.course_id).subscribe(response => {
                if (response['length'] > 0){
                    this.router.navigate(['/user/course-details/' + this.course_id]);
                }
            });
        } else {
            let errorNotification = new ErrorNotification("Please fill in all fields", 'errorField', 'danger');
            errorNotification.setTimeout(3000);
            errorNotification.render();
            return
        }
	}

    cancel() {
        this.router.navigate(['/user/course-details/' + this.course_id]);
    }
}
