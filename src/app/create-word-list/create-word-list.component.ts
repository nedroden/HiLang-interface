import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

	number = 5;

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

	saveList(){
		console.log("Saved your file");
	}
}