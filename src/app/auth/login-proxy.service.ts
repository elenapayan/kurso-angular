import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  login(formLogin): Observable<any> {
    const auth = btoa(`${formLogin.username}:${formLogin.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + auth
      })
    };
    return this.httpClient.post('http://localhost:3000/api/login/', '', httpOptions); // 2 arg es los datos nuevos
  }
}

// La única responsabilidad de este servicio es recuperar el token del servidor
