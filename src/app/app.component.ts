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

    ngOnInit() {}

    checkCookie() {
        this._cookie.checkValidityPost().subscribe(response => {
            if (response['approved'] == false) {
                if (this._cookie.getValue() != null)
                    this._cookie.destroy();
                this._router.navigate(['/login']);
            }
        });

    }
}
