import { Component, OnInit } from '@angular/core';
import { Dispatch } from '../../scripts/Dispatch';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        this.createElement();
    }

    createElement() {
        let menuItems = [
            {
                label: "Account",
                icon: "user",
                component: "header"
            },
            {
                label: "Browse",
                icon: "folder",
                component: "browse"
            },
            {
                label: "My courses",
                icon: "save",
                component: "mycourses"

            },
            {
                label: "Log out",
                icon: "sign-out",
                component: "lessonview"
            },
        ];

        let ul_item = document.createElement("ul");
        ul_item.className = "nav flex-column";

        for(let item of menuItems) {
            let li_item = document.createElement("li");
            li_item.id = item.component;
            li_item.className = "nav-item";

            let icon = document.createElement("i");
            icon.className = 'fa fa-' + item.icon + ' menu-icon';

            let a_item = document.createElement("a");
            a_item.innerText = item.label;
            a_item.className = "nav-link";

            li_item.appendChild(icon);
            li_item.appendChild(a_item);
            ul_item.appendChild(li_item);

            document.getElementById('menuBar').appendChild(ul_item);
        }
    }
}
