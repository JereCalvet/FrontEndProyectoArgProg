import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  personas: Persona[];
  fotoDefault: string = 'assets/img/marcelo-gallardo.png';

  constructor(private personasSvc: PersonasService) {}

  ngOnInit(): void {
    this.personasSvc.obtenerPersonas().subscribe((respuesta) => {
      this.personas = respuesta.personas;
    });
  }
}
