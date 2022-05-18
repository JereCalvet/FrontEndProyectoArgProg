import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

@Component({
  selector: 'app-personadetalle',
  templateUrl: './personadetalle.component.html',
  styleUrls: ['./personadetalle.component.css'],
})
export class PersonadetalleComponent implements OnInit {
  constructor(private personasSvc: PersonasService) {}

  ngOnInit(): void {
    this.personasSvc.obtenerPersonaPorId(2).subscribe((respuesta) => {
      console.log(respuesta);
    });
  }
}
