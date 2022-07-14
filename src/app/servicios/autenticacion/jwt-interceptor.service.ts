import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements JwtInterceptorService {
  constructor(private authSvc: AutenticacionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authSvc.currentUserValue;
    if (currentUser && currentUser['Access-Token']) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser['Access-Token']}`,
        },
      });
    }
    return next.handle(req);
  }
}
