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
    user = {
            avatar: "",
            name: "",
            email: "",
            bio: "",
            type: "",
            memberSince: "",
        };


    constructor(private _api: HilangApiService, private _cookie: CookieService) { }

    ngOnInit() {
        
        this.user_id = this._cookie.getValue()['user_id'];
        this._api.call('/user/' + this.user_id + "/", {}).subscribe(data => {
            console.log(data)
            this.user['name'] = data['name'];
            this.user['email'] = data['email'];
            this.user['type'] = (data['distributor'] == 0) ? 'Normal user':'Distributor';
            this.user['memberSince'] = data['created_at'];
            if(data['bio'] !== null){
                this.user['bio'] = data['bio'];
            } else {
                this.user['bio'] = 'Empty bio';
            }
            if(data['avatar'] === '' || data['avatar'] === null ){
                this.user['avatar'] = "../../assets/no-avatar.png" ;
            } else {
                this.user['avatar'] = data['avatar'];
            }
        });
    }
}
