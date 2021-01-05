import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class userService {
    public url: string;
    public identity: User;
    public token: string;

    constructor(public _http: HttpClient){
        this.url = global.url;
    }

    prueba(){
        return 'hola mundo desde el servicio';
    }

    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers: headers});

    }

    login(user, getoken = null): Observable<any>{
        if(getoken != null){
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    update(token, user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url+'user/edit', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity != 'undefined'){
            this.identity = identity;

        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token && token != 'undefined'){
            this.token = token;

        } else {
            this.token = null;
        }

        return this.token;
    }
}


