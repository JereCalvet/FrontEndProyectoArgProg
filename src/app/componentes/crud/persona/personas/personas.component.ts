import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/persona';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { PersonaAddComponent } from '../persona-add/persona-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  listadoPersonas: Persona[] = [];

  constructor(
    private personaSvc: PersonasService,
    private router: Router,
    private toasterSvc: ToastrService,
    private personaDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.personaSvc.obtenerPersonas().subscribe((personas) => {
      this.listadoPersonas = personas;
    });
  }

  onView(persona: Persona) {
    this.router.navigate(['/persona/' + persona.id]);
  }

  onAddPersona() {
    this.personaSvc.obtenerPersonaLogeada().subscribe({
      next: (res: any) => {
        if (res.status === HttpStatusCode.Accepted) {
          //no esta logeado
          this.router.navigate(['/login']);
        } else {
          //esta logeado y tiene persona
          this.router.navigate(['/persona/' + res.id]);
        }
      },
      error: (error) => {
        //esta logeado pero no tiene persona
        this.crearPersona();
      },
    });
  }

  crearPersona() {
    const dialogRef = this.personaDialog.open(PersonaAddComponent);
    dialogRef.componentInstance.onAddPersona.subscribe((p) => {
      dialogRef.close();
      this.personaSvc.agregarPersona(p).subscribe({
        next: (persona) => {
          this.toasterSvc.success('Persona agregada correctamente.', 'Exito');
          this.router.navigate(['/persona/' + persona.id]);
        },
        error: (err: HttpErrorResponse) => {
          this.toasterSvc.error(err.message, 'Error');
        },
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      dialogRef.componentInstance.onAddPersona.unsubscribe();
    });
  }
}
