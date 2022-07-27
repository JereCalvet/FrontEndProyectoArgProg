import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() autorizacion: boolean;

  constructor(
    private personaSvc: PersonasService,
    private toasterSvc: ToastrService,
    private habilidadDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onEdit(habilidad: Habilidad) {
    const dialogRef = this.habilidadDialog.open(HabilidadAddComponent, {
      data: habilidad,
    });
    dialogRef.componentInstance.onUpdateHabilidad.subscribe((h) => {
      dialogRef.close();
      this.personaSvc.actualizarHabilidad(this.personaId, h).subscribe({
        next: (habilidades) => {
          this.listadoHabilidades = habilidades;
          this.toasterSvc.success('Habilidad actualizada correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdateHabilidad.unsubscribe();
      });
    });
  }

  onDelete(habilidad: Habilidad) {
    this.personaSvc.borrarHabilidad(this.personaId, habilidad.id).subscribe({
      next: () => {
        this.listadoHabilidades = this.listadoHabilidades.filter((h) => h.id !== habilidad.id);
        this.toasterSvc.success('Habilidad borrada correctamente.', 'Exito');
      },
      error: (err: HttpErrorResponse) => {
        this.toasterSvc.error(err.message, 'Error');
      },
    });
  }

  agregarHabilidad() {
    const dialogRef = this.habilidadDialog.open(HabilidadAddComponent);
    dialogRef.componentInstance.onAddHabilidad.subscribe((habilidad) => {
      dialogRef.close();
      this.personaSvc.agregarHabilidad(this.personaId, habilidad).subscribe({
        next: (habilidades) => {
          this.listadoHabilidades = habilidades;
          this.toasterSvc.success('Habilidad agregado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddHabilidad.unsubscribe();
    });
  }
}
