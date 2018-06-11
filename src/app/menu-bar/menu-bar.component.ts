import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor(private _cookie: CookieService, private _router: Router) { }

    ngOnInit() {}

    items = [
        {
            label: "Dashboard",
            icon: "home",
            href: "/user"
        },
        {
            label: "Browse",
            icon: "folder",
            href: "/user/browse"
        },
        {
            label: "My courses",
            icon: "save",
            href: "/user/courses"
        },
        {
            label: "Settings",
            icon: "wrench",
            href: "/user/settings"
        },
    ];

    logOut() {
        this._cookie.destroy();
        this._router.navigate(["/login"]);
    }
}
