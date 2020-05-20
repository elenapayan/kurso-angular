import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  // login(username: string, password: string): Observable<TokenDTO> {
  //   console.log(username, password);
  //   return this.httpClient.post<TokenDTO>('http://localhost:3000/api/login', { username, password });
  // }


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
  ​
  // register(formBody): Observable<any> {
  //   return this.httpClient.post('http://localhost:3001/api/users/', formBody);
  // }


}

// La única responsabilidad de este servicio es recuperar el token del servidor
