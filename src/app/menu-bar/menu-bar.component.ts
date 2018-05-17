import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

    items = [
        {
            label: "Account",
            icon: "user",
            href: "/user/header"
        },
        {
            label: "Browse",
            icon: "folder",
            href: "/user/lesson"
        },
        {
            label: "My courses",
            icon: "save",
            href: "/user/mc"

        },
        {
            label: "Log out",
            icon: "sign-out",
            href: "/home"
        }
    ];
}
