import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service'

@Component({
    selector: 'app-home-header',
    providers: [AppService],
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {

    constructor(
        private _service: AppService) {}

    ngOnInit() {
        this._service.checkCredentials();
    }

    logout() {
        this._service.logout();
    }
}
