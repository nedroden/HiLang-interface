import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YourDialog>) { }

  ngOnInit() {
  	let dialogRef = dialog.open(DialogComponent, {
  		height: '400px',
  		width: '600px',
  	});
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
