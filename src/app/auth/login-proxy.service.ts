import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenDTO } from './auth.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  login(loginForm): Observable<TokenDTO> {
    const auth = btoa(`${loginForm.username}:${loginForm.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };
    return this.httpClient.post<TokenDTO>('http://localhost:3000/api/login/', '', httpOptions);
  }
}

// La única responsabilidad de este servicio es recuperar el token del servidor
