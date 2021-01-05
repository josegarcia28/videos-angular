import { Component, DoCheck, OnInit } from '@angular/core';
import { userService } from './services/user.service';
import { User } from './models/user';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public identity: UserModel = new UserModel;
  public token: string;

  title = 'videos-angular';

  constructor(private _userService: userService){

  }

  ngOnInit(): void {
   
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
