import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  listadoPersonas: Persona[] = [];

  constructor(private personaSvc: PersonasService, private router: Router) {}

  ngOnInit(): void {
    this.personaSvc.obtenerPersonas().subscribe((personas) => {
      this.listadoPersonas = personas;
    });
  }

  onView(persona: Persona) {
    this.router.navigate(['/persona/' + persona.id]);
  }
}
