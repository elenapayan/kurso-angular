import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('/home')) {

      const token: string = localStorage.getItem('token');
      if (token) {
        // Hacemos un clon de la request original y la modificamos
        const reqAuth = req.clone(
          { headers: req.headers.set('Authorization', 'Bearer ' + token) }
        );
        // Llamamos al siguiente elemento de la cadena y le pasamos la req modificada
        return next.handle(reqAuth);
      }
    }
    return next.handle(req);
  }
}
