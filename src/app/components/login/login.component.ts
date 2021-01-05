import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: string;

  constructor(private _userService: userService,
              private _router: Router,
              private _route: ActivatedRoute ) {
    this.page_title = 'Login';
    this.user = new User(1,'','','','','ROLE_USER','');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form){
    this._userService.login(this.user).subscribe(
      resp => {
        if(!resp.status || resp.status != 'error'){
          this.status = 'success';
          this.identity = JSON.stringify(resp);
          
          // Obtener token
          this._userService.login(this.user, true).subscribe(
            resp => {
              if(!resp.status || resp.status != 'error'){
                this.status = 'success';
                this.token = resp;
              
                console.log(this.identity);
                console.log(this.token);
                
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', this.identity);

                this._router.navigate(['/inicio']);

              } else {
                console.log('error');
                this.status = 'success';
              }
            },
            error => {
              console.log('error');
              this.status = 'success';
            }
          );
        } else {
          console.log('error');
          this.status = 'success';
        }
      },
      error => {
        console.log('error');
        this.status = 'success';
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let sure = +params['sure'];

      if(sure == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['/inicio']);
      }
    })
  }

}
