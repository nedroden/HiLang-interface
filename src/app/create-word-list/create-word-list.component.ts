import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

	table: HTMLTableElement;

    constructor() { }

    ngOnInit() {
    	this.addOnClick();
    	this.createRows();
    }

    addOnClick(){
       	var addRowsButton = document.getElementById("addRowsButton");
    	addRowsButton.onclick = this.createRows;

    	var saveButton = document.getElementById("saveButton");
    	saveButton.onclick = this.saveList;

    }

	createRows(){
		for(let x = 0; x < 5; x ++){			
			var table = document.getElementById("input_field") as HTMLTableElement;
			var i = table.getElementsByTagName("tr").length;
			var row = table.insertRow(i);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = "" + i;
			
			var cell2 = row.insertCell(1);
			var cell2_input = document.createElement("input");
			cell2.appendChild(cell2_input);
			
			var cell3 = row.insertCell(2);
			var cell3_input = document.createElement("input");
			cell3.appendChild(cell3_input);

		}
	}

	saveList(){
		console.log("Saved your file");
	}
}
