import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: userService ) {
    this.page_title = 'Registro';
    this.user = new User(1,'','','','','ROLE_USER','');
  }

  ngOnInit(): void {
    console.log(this._userService.prueba());
  }
  
  onSubmit(form){
    this._userService.register(this.user).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
    
  }

}
