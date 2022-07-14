import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Habilidad } from 'src/app/modelo/Habilidad';

@Component({
  selector: 'app-habilidad-item',
  templateUrl: './habilidad-item.component.html',
  styleUrls: ['./habilidad-item.component.css'],
})
export class HabilidadItemComponent implements OnInit {
  @Input() habilidad: Habilidad;
  @Input() autorizacion: boolean;
  @Output() onEditHabilidad = new EventEmitter<Habilidad>();
  @Output() onDeleteHabilidad = new EventEmitter<Habilidad>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(habilidad: Habilidad) {
    this.onEditHabilidad.emit(habilidad);
  }

  onDelete(habilidad: Habilidad) {
    this.onDeleteHabilidad.emit(habilidad);
  }
}
