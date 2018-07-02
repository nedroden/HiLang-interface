import { Component, OnInit, Input } from '@angular/core';
import { HilangApiService } from '../hilang-api.service';
import { CookieService } from '../cookie.service';
import { AccountService } from '../account.service';



@Component({
  selector: 'app-userinfoblock',
  templateUrl: './userinfoblock.component.html',
  styleUrls: ['./userinfoblock.component.css']
})
export class UserinfoblockComponent implements OnInit {
    user = {
            avatar: "",
            name: "",
            email: "",
            bio: "",
            type: "",
            memberSince: "",
        };


    constructor(private _api: HilangApiService, private _account: AccountService) { }

    ngOnInit() {
        this._account.getAccountSettings().subscribe(data => {
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
            this.user['avatar'] = data['avatar'];
        });
    }
}