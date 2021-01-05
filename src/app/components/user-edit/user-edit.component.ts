import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token: string;

  constructor(private _userService: userService ) {
    this.page_title = 'Ajustes de Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.user = new User(this.identity.sub, 
                         this.identity.name, 
                         this.identity.surname,
                         this.identity.email,
                         '','ROLE_USER','');
  }

  ngOnInit(): void {
    
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      resp => {
        if(resp && resp.status == 'success'){
          this.status = 'success';
          this.identity = resp.user;
          this.user = resp.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error en respuesta';
          
        }
        
      },
      error => {
        this.status = 'error';
        console.log('error');
      }
    )
  }
  

}
