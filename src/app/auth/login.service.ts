import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { TokenDTO } from '../dto/token.dto';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { LoginProxyService } from './login-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private proxy: LoginProxyService,
    private router: Router
  ) { }


  login(loginForm: object): Observable<User>{

    return this.proxy.login(loginForm).pipe(
      map((tokenDTO: TokenDTO) => {
        localStorage.setItem('token', tokenDTO.token);
        const tokenModel = this.adaptTokenDTOToModel(tokenDTO);
        const decodeToken = jwt_decode(tokenModel.token);
        this.router.navigate(['backOffice']);
        return decodeToken.body;
      })
    );
  }

  private adaptTokenDTOToModel(tokenDTO: TokenDTO): Token {
    return {
      message: tokenDTO.message,
      token: tokenDTO.token
    };
  }
}



