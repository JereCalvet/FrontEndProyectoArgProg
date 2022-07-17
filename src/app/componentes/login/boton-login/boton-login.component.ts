import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-boton-login',
  templateUrl: './boton-login.component.html',
  styleUrls: ['./boton-login.component.css'],
})
export class BotonLoginComponent implements OnInit {
  texto: string = 'Login';
  estadoLogeado: boolean = false;

  constructor(private router: Router, private authSvc: AutenticacionService) {}

  ngOnInit(): void {
    const currentUser = this.authSvc.currentUserValue;
    if (currentUser && currentUser['Access-Token']) {
      this.texto = 'Logout';
      this.estadoLogeado = true;
    } else {
      this.texto = 'Login';
      this.estadoLogeado = false;
    }
  }

  onClick() {
    if (this.estadoLogeado) {
      this.authSvc.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
