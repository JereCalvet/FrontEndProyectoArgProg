import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

@Component({
  selector: 'app-persona-item',
  templateUrl: './persona-item.component.html',
  styleUrls: ['./persona-item.component.css'],
})
export class PersonaItemComponent implements OnInit {
  persona: Persona;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personaSvc: PersonasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.personaSvc
        .obtenerPersonaPorId(+params.get('id')!)
        .subscribe((respuesta) => {
          this.persona = respuesta;
        });
    });
  }

  calcularEdad() {
    const fechaNacimiento = new Date(this.persona.fechaNacimiento);
    const difeTiempo = Math.abs(Date.now() - fechaNacimiento.getTime());
    return Math.floor(difeTiempo / (1000 * 3600 * 24) / 365.25);
  }
}
