import { Component, OnInit } from '@angular/core';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';

@Component({
    selector: 'app-userwelcome',
    templateUrl: './userwelcome.component.html',
    styleUrls: ['./userwelcome.component.css']
})
export class UserwelcomeComponent implements OnInit {
    private user = <Object>{
                    pk: 0,
                    fields: {
                                name: ""
                    }};

    links = [
        {
            label: "My courses",
            href: "/user/courses"
        },
        {
            label: "Account settings",
            href: "/user/settings"
        },
        {
            label: "Browse all courses",
            href: "/user/browse"
        }
    ];

    constructor(private _api: HilangApiService,
                private _cookie: CookieService) {}

    ngOnInit() {
        this._api.call('/user/' + this._cookie.getValue()['user_id'] + "/", {}).subscribe(data => {
            this.user = data;
            console.log(this.user);
        });
    }
}
