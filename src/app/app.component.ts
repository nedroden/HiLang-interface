import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'Hi, Lang';

    constructor(private _router: Router, private _cookie: CookieService) {}

    ngOnInit() {
        let cookie = this._cookie.getCookie();

        if (window.location.href.includes("user") && cookie == false)
            window.location.href = "/login";

        this._cookie.checkValidity(cookie).subscribe(response => {
            if (!response.approved) {
                this._cookie.destroy();
            }
        });
    }
}
