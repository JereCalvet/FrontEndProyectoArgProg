import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/modelo/usuario';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private readonly url: string = environment.apiUrl;
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  obtenerNombreUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}auth/current`);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.url}auth/login`, credenciales).pipe(
      map((responseAccessTokensUser) => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseAccessTokensUser));
        this.currentUserSubject.next(responseAccessTokensUser);
        return responseAccessTokensUser;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next('{}');
    this.router.navigate(['/personas']);
  }

  register(userData: any) {
    return this.http.post(`${environment.apiUrl}auth/register`, userData);
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
}
