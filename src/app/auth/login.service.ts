import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesBusService } from '../notificaciones-bus.service';
import { TokenDTO } from './auth.dto';
import { LoginProxyService } from './login-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private proxy: LoginProxyService,
    private notificacionesBus: NotificacionesBusService,
    private router: Router
  ) { }

  login(loginForm: object): void {
    this.proxy.login(loginForm).subscribe(
      (tokenDTO: TokenDTO) => {
        localStorage.setItem('token', tokenDTO.token);
        this.notificacionesBus.showInfo('Welcome!');
        this.router.navigate(['backOffice']);
      }, (err) => {
        this.notificacionesBus.showError('Incorrect password or username');
      }
    );
  }
}

// La responsabilidad es hacer el login y guardar el token


