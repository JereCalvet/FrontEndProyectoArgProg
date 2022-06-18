import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estudio } from 'src/app/modelo/Estudio';

@Component({
  selector: 'app-estudio-item',
  templateUrl: './estudio-item.component.html',
  styleUrls: ['./estudio-item.component.css'],
})
export class EstudioItemComponent implements OnInit {
  @Input() estudio: Estudio;
  @Output() onEditEstudio = new EventEmitter<Estudio>();
  @Output() onDeleteEstudio = new EventEmitter<Estudio>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(estudio: Estudio) {
    this.onEditEstudio.emit(estudio);
  }

  onDelete(estudio: Estudio) {
    this.onDeleteEstudio.emit(estudio);
  }
}
