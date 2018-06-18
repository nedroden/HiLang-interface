import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	this.addKeyEvent();
  }

  addKeyEvent() {
        let searchInput = (<HTMLInputElement>document.getElementById('search'))
        searchInput.onkeypress = function(event) {
            if(event.keyCode === 13) {
            	event.preventDefault();
                this.search();
            }
        }.bind(this);
    }

  search() {
        let searchFor = (<HTMLInputElement>document.getElementById('search')).value;
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/user/browse/' + searchFor]));
    }

}
