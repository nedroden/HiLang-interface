import { Component, OnInit, Input } from '@angular/core';
import { HilangApiService } from '../hilang-api.service';

@Component({
  selector: 'app-userinfoblock',
  templateUrl: './userinfoblock.component.html',
  styleUrls: ['./userinfoblock.component.css']
})
export class UserinfoblockComponent implements OnInit {
    @Input() user_id: number;
    private user: object;

    // user = {
    //     name: "Lang",
    //     bio: "Here I can tell something about myself. This information is also shown in other places.",
    //     avatar: "http://www.mindingthecampus.com/originals/GOldmanprof.jpg",
    //     nativeLanguage: "Dutch",
    //     level: 3,
    //     subscribedCourses: 6,
    //     completedCourses: 2,
    //     memberSince: "May 18, 2018",
    //     type: "Contributor"
    // }

    constructor(private _api: HilangApiService) { }

    ngOnInit() {
        this._api.call('/user/' + this.user_id + "/", {}).subscribe(data => {
            this.user = data[0];
        });
    }
}
