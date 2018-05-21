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
        {
            label: "Log out",
            icon: "sign-out",
            href: "/home"
        }
    ];
}
