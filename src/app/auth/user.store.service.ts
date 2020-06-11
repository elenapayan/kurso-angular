import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { Store } from '../store';
import { LoginService } from './login.service';



@Injectable({ providedIn: 'root' })

export class UserStoreService extends Store<User[]> {

    users = [];

    constructor(private loginService: LoginService, private router: Router) {
        super();
    }

    init(): void {
        const token = localStorage.getItem('token');
        if (token) {
            const decode = jwt_decode(token);
            const u = Object.assign({}, decode.body);
            this.store([...this.users, u]);
        }
    }

    login$(user: object) {
        this.loginService.login(user).toPromise();
        const u = Object.assign({}, user);
        this.store([...this.users, u]);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
        this.store([]);
    }


}
