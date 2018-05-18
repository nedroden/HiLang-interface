import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfoblock',
  templateUrl: './userinfoblock.component.html',
  styleUrls: ['./userinfoblock.component.css']
})
export class UserinfoblockComponent implements OnInit {

    user = {
        name: "Lang",
        avatar: "http://www.mindingthecampus.com/originals/GOldmanprof.jpg",
        nativeLanguage: "Dutch",
        level: 3,
        subscribedCourses: 6,
        completedCourses: 2,
        memberSince: "May 18, 2018",
        type: "Contributor"
    }

    constructor() { }

    ngOnInit() {
    }
}
