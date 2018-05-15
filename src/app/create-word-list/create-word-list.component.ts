import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-word-list',
  templateUrl: './create-word-list.component.html',
  styleUrls: ['./create-word-list.component.css']
})
export class CreateWordListComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    	this.createElement;
    }

	createElement(){
	  	var i = $('table tr').length;

		$(document).on('keyup', '.lst', function(e) {
		  	var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {
				console.log("hoi");
				var newLine = '<tr>';
			    newLine += '<td>' + i + '</td>';
			    newLine += '<td><input type="text" class="inputs" name="left_input' + i + '" id="left_input' + i + '" /></td>';
			    newLine += '<td><input type="text" class="inputs" name="right_input' + i + '" id="left_input' + i + '" /></td>';
			    newLine += '</tr>';
			    $('table').append(newLine);
			    $(this).focus().select();
				i++;
		 	}
		});

		$(document).on('keydown', '.inputs', function(e) {
		    var code = (e.keyCode ? e.keyCode : e.which);
		    if (code == 13) {
		        var index = $('.inputs').index(this) + 1;
		    	$('.inputs').eq(index).focus();
		  	}
		});
	  }

}
