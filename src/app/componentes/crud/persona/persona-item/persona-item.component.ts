import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/modelo/persona';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-item',
  templateUrl: './persona-item.component.html',
  styleUrls: ['./persona-item.component.css'],
})
export class PersonaItemComponent implements OnInit {
  persona: Persona;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaSvc: PersonasService,
    private spinnerSvc: NgxSpinnerService,
    private toasterSvc: ToastrService,
    private personaDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.personaSvc.obtenerPersonaPorId(+params.get('id')!).subscribe((respuesta) => {
        this.persona = respuesta;
      });
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
          this.toasterSvc.success('Persona actualizada correctamente.', 'Exito');
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
}
