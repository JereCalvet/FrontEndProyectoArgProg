import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Proyecto } from 'src/app/modelo/Proyecto';

@Component({
  selector: 'app-proyecto-item',
  templateUrl: './proyecto-item.component.html',
  styleUrls: ['./proyecto-item.component.css'],
})
export class ProyectoItemComponent implements OnInit {
  @Input() proyecto: Proyecto;
  @Input() autorizacion: boolean;
  @Output() onEditProyecto = new EventEmitter<Proyecto>();
  @Output() onDeleteProyecto = new EventEmitter<Proyecto>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(proyecto: Proyecto) {
    this.onEditProyecto.emit(proyecto);
  }

  onDelete(proyecto: Proyecto) {
    this.onDeleteProyecto.emit(proyecto);
  }
}
