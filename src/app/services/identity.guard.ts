import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from './user.service';



@Injectable()
export class IdentityGuard implements CanActivate{
    
    constructor(private _router: Router,
                private _userService: userService){
        
    }
    
    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity){
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}