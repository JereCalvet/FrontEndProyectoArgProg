import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Habilidad } from 'src/app/modelo/Habilidad';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HabilidadAddComponent } from '../habilidad-add/habilidad-add.component';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  @Input() listadoHabilidades: Habilidad[];
  @Input() personaId: number;

  constructor(
    private personaSvc: PersonasService,
    private spinnerSvc: NgxSpinnerService,
    private toasterSvc: ToastrService,
    private habilidadDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onEdit(habilidad: Habilidad) {
    const dialogRef = this.habilidadDialog.open(HabilidadAddComponent, {
      data: habilidad,
    });
    dialogRef.componentInstance.onUpdateHabilidad.subscribe((h) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.actualizarHabilidad(this.personaId, h).subscribe({
        next: (habilidades) => {
          this.listadoHabilidades = habilidades;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Habilidad actualizada correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdateHabilidad.unsubscribe();
      });
    });
  }

  onDelete(habilidad: Habilidad) {
    this.spinnerSvc.show();
    this.personaSvc.borrarHabilidad(this.personaId, habilidad.id).subscribe({
      next: () => {
        this.listadoHabilidades = this.listadoHabilidades.filter((h) => h.id !== habilidad.id);
        this.spinnerSvc.hide();
        this.toasterSvc.success('Habilidad borrada correctamente.', 'Exito');
      },
      error: (err: HttpErrorResponse) => {
        this.spinnerSvc.hide();
        this.toasterSvc.error(err.message, 'Error');
      },
    });
  }

  agregarHabilidad() {
    const dialogRef = this.habilidadDialog.open(HabilidadAddComponent);
    dialogRef.componentInstance.onAddHabilidad.subscribe((habilidad) => {
      this.spinnerSvc.show();
      dialogRef.close();
      this.personaSvc.agregarHabilidad(this.personaId, habilidad).subscribe({
        next: (habilidads) => {
          this.listadoHabilidades = habilidads;
          this.spinnerSvc.hide();
          this.toasterSvc.success('Habilidad agregado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.spinnerSvc.hide();
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddHabilidad.unsubscribe();
    });
  }
}
