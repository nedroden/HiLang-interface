import { Component, OnInit, Input } from '@angular/core';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';


@Component({
  selector: 'app-userinfoblock',
  templateUrl: './userinfoblock.component.html',
  styleUrls: ['./userinfoblock.component.css']
})
export class UserinfoblockComponent implements OnInit {
    user_id: number;
    private user;


    constructor(private _api: HilangApiService, private _cookie: CookieService) { }

    ngOnInit() {
        this.user = {
            name: "Lang",
            bio: "Here I can tell something about myself. This information is also shown in other places.",
            avatar: "https://www.w3schools.com/w3css/img_lights.jpg",
            memberSince: "May 18, 2018",
            type: "Contributor"
        }
        this.user_id = this._cookie.getValue()['user_id'];
        this._api.call('http://localhost:8000/api/user/' + this.user_id + "/", {}).subscribe(data => {
            console.log(data)
            this.user.name = data.name;
            this.user.email = data.email;
            this.user.type = (data.distributor == 0) ? 'Normal user':'Distributor';
            this.user.memberSince = data.created_at;
            if(data.bio !== null){
                this.user.bio = data.bio;
            } else {
                this.user.bio = 'Empty bio';
            }
        });
    }
}
