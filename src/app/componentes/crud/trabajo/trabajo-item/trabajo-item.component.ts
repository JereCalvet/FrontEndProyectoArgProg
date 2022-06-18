import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Trabajo } from 'src/app/modelo/Trabajo';

@Component({
  selector: 'app-trabajo-item',
  templateUrl: './trabajo-item.component.html',
  styleUrls: ['./trabajo-item.component.css'],
})
export class TrabajoItemComponent implements OnInit {
  @Input() trabajo: Trabajo;
  @Output() onEditTrabajo = new EventEmitter<Trabajo>();
  @Output() onDeleteTrabajo = new EventEmitter<Trabajo>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(trabajo: Trabajo) {
    this.onEditTrabajo.emit(trabajo);
  }

  onDelete(trabajo: Trabajo) {
    this.onDeleteTrabajo.emit(trabajo);
  }
}
