import { Injectable } from '@angular/core';
import { TokenDTO } from './auth.dto';
import { LoginProxyService } from './login-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private proxy: LoginProxyService) { }

  login(formLogin: object): void {
    console.log(formLogin, 'jshshs');
    this.proxy.login(formLogin).subscribe(
      (tokenDTO: TokenDTO) => localStorage.setItem('token', tokenDTO.token),
      (error) => console.log(error)
    );
  }
}

// La responsabilidad es hacer el login y guardar el token


