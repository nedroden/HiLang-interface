import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-userwelcome',
    templateUrl: './userwelcome.component.html',
    styleUrls: ['./userwelcome.component.css']
})
export class UserwelcomeComponent implements OnInit {

    user = {
        name: "Lang"
    }

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

    courses = [
        {
            title: "French for beginners",
            description: "An introductory course to the French language.",
            author: "Vladimir Putin",
            lastPracticed: "today",
            href: "/user/course-details/1"
        },
        {
            title: "La lingua Italiana #2",
            description: "The Italian language for advanced students.",
            author: "Morgan Freeman",
            lastPracticed: "two days ago",
            href: "/user/course-details/1"
        },
        {
            title: "Dutch, the language of the world",
            description: "Dutch: the language of the most powerful country on Earth.",
            author: "Robert Monden",
            lastPracticed: "three days ago",
            href: "/user/course-details/1"
        }
    ];

    constructor() {}

    ngOnInit() {
    }
}
