import { Component } from '@angular/core';
import {AppService} from '../app.service'

@Component({
  selector: 'app-login-form',
  providers: [AppService],
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public loginData = {username: '', password: ''};

    constructor(private _service: AppService) {}

    login() {
        this._service.obtainAccessToken(this.loginData);
    }
}
