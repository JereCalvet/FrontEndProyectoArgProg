import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/modelo/persona';
import { Usuario } from 'src/app/modelo/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-item',
  templateUrl: './persona-item.component.html',
  styleUrls: ['./persona-item.component.css'],
})
export class PersonaItemComponent implements OnInit {
  persona: Persona;
  usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaSvc: PersonasService,
    private spinnerSvc: NgxSpinnerService,
    private toasterSvc: ToastrService,
    private personaDialog: MatDialog,
    private authSvc: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.personaSvc.obtenerPersonaPorId(+params.get('id')!).subscribe({
        next: (personaEncontrada) => {
          this.persona = personaEncontrada;
          this.spinnerSvc.hide();
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error('No se encontro la persona.', 'Error');
          this.router.navigate(['/personas']);
        },
      });
    });

    this.authSvc.obtenerNombreUsuario().subscribe({
      next: (u: Usuario) => {
        this.usuario = u;
      },
      error: (err: HttpErrorResponse) => {
        // no esta logeado, da igual
      },
    });
  }

  calcularEdad() {
    const fechaNacimiento = new Date(this.persona.fechaNacimiento);
    const difeTiempo = Math.abs(Date.now() - fechaNacimiento.getTime());
    return Math.floor(difeTiempo / (1000 * 3600 * 24) / 365.25);
  }

  editarPersona() {
    const dialogRef = this.personaDialog.open(PersonaAddComponent, {
      data: this.persona,
    });
    dialogRef.componentInstance.onUpdatePersona.subscribe((p) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.actualizarPersonaPorId(this.persona.id, p).subscribe({
        next: (personaActualizada) => {
          this.persona = personaActualizada;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Portfolio actualizado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdatePersona.unsubscribe();
      });
    });
  }

  checkPermisoEditar(): boolean {
    return this.persona && this.usuario && this.persona.usuario?.username === this.usuario.username;
  }
}
