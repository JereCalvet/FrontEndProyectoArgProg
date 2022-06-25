import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Estudio } from 'src/app/modelo/Estudio';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { EstudioAddComponent } from '../estudio-add/estudio-add.component';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css'],
})
export class EstudiosComponent implements OnInit {
  @Input() listadoEstudios: Estudio[];
  @Input() personaId: number;

  constructor(
    private personaSvc: PersonasService,
    private spinnerSvc: NgxSpinnerService,
    private toasterSvc: ToastrService,
    private estudioDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  agregarEstudio() {
    const dialogRef = this.estudioDialog.open(EstudioAddComponent);
    dialogRef.componentInstance.onAddEstudio.subscribe((estudio) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.agregarEstudio(this.personaId, estudio).subscribe({
        next: (estudios) => {
          this.listadoEstudios = estudios;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Estudio agregado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddEstudio.unsubscribe();
    });
  }

  onEdit(estudio: Estudio) {
    const dialogRef = this.estudioDialog.open(EstudioAddComponent, {
      data: estudio,
    });
    dialogRef.componentInstance.onUpdateEstudio.subscribe((e) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.actualizarEstudio(this.personaId, e).subscribe({
        next: (estudios) => {
          this.listadoEstudios = estudios;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Estudio actualizado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdateEstudio.unsubscribe();
      });
    });
  }

  onDelete(estudio: Estudio) {
    this.spinnerSvc.show();
    this.personaSvc.borrarEstudio(this.personaId, estudio.id).subscribe({
      next: () => {
        this.listadoEstudios = this.listadoEstudios.filter((e) => e.id !== estudio.id);
        this.spinnerSvc.hide();
        this.toasterSvc.success('Estudio borrado correctamente.', 'Exito');
      },
      error: (err: HttpErrorResponse) => {
        this.spinnerSvc.hide();
        this.toasterSvc.error(err.message, 'Error');
      },
    });
  }
}
