import { Component, Input, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/modelo/Trabajo';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TrabajoAddComponent } from '../trabajo-add/trabajo-add.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css'],
})
export class TrabajosComponent implements OnInit {
  @Input() listadoTrabajos: Trabajo[];
  @Input() personaId: number;
  @Input() autorizacion: boolean;

  constructor(
    private personaSvc: PersonasService,
    private spinnerSvc: NgxSpinnerService,
    private toasterSvc: ToastrService,
    private trabajoDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  agregarTrabajo() {
    const dialogRef = this.trabajoDialog.open(TrabajoAddComponent);
    dialogRef.componentInstance.onAddTrabajo.subscribe((trabajo) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.agregarTrabajo(this.personaId, trabajo).subscribe({
        next: (trabajos) => {
          this.listadoTrabajos = trabajos;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Trabajo agregado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddTrabajo.unsubscribe();
    });
  }

  onEdit(trabajo: Trabajo) {
    const dialogRef = this.trabajoDialog.open(TrabajoAddComponent, {
      data: trabajo,
    });
    dialogRef.componentInstance.onUpdateTrabajo.subscribe((t) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.actualizarTrabajo(this.personaId, t).subscribe({
        next: (trabajos) => {
          this.listadoTrabajos = trabajos;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Trabajo actualizado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdateTrabajo.unsubscribe();
      });
    });
  }

  onDelete(trabajo: Trabajo) {
    this.spinnerSvc.show();
    this.personaSvc.borrarTrabajo(this.personaId, trabajo.id).subscribe({
      next: () => {
        this.listadoTrabajos = this.listadoTrabajos.filter((t) => t.id !== trabajo.id);
        this.spinnerSvc.hide();
        this.toasterSvc.success('Trabajo borrado correctamente.', 'Exito');
      },
      error: (err: HttpErrorResponse) => {
        this.spinnerSvc.hide();
        this.toasterSvc.error(err.message, 'Error');
      },
    });
  }
}
