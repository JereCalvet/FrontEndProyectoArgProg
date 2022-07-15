import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Proyecto } from 'src/app/modelo/Proyecto';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ProyectoAddComponent } from '../../proyecto/proyecto-add/proyecto-add.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  @Input() listadoProyectos: Proyecto[];
  @Input() personaId: number;
  @Input() autorizacion: boolean;

  constructor(
    private personaSvc: PersonasService,
    private toasterSvc: ToastrService,
    private proyectoDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onEdit(proyecto: Proyecto) {
    const dialogRef = this.proyectoDialog.open(ProyectoAddComponent, {
      data: proyecto,
    });
    dialogRef.componentInstance.onUpdateProyecto.subscribe((p) => {
      dialogRef.close();
      this.personaSvc.actualizarProyecto(this.personaId, p).subscribe({
        next: (proyectos) => {
          this.listadoProyectos = proyectos;
          this.toasterSvc.success('Proyecto actualizado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.toasterSvc.error(err.message, 'Error');
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.onUpdateProyecto.unsubscribe();
      });
    });
  }

  onDelete(proyecto: Proyecto) {
    this.personaSvc.borrarProyecto(this.personaId, proyecto.id).subscribe({
      next: () => {
        this.listadoProyectos = this.listadoProyectos.filter((p) => p.id !== proyecto.id);
        this.toasterSvc.success('Proyecto borrado correctamente.', 'Exito');
      },
      error: (err: HttpErrorResponse) => {
        this.toasterSvc.error(err.message, 'Error');
      },
    });
  }

  agregarProyecto() {
    const dialogRef = this.proyectoDialog.open(ProyectoAddComponent);
    dialogRef.componentInstance.onAddProyecto.subscribe((proyecto) => {
      dialogRef.close();
      this.personaSvc.agregarProyecto(this.personaId, proyecto).subscribe({
        next: (proyectos) => {
          this.listadoProyectos = proyectos;
          this.toasterSvc.success('Proyecto agregado correctamente.', 'Exito');
        },
        error: (err: HttpErrorResponse) => {
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddProyecto.unsubscribe();
    });
  }
}
