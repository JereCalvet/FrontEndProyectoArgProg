import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estudio } from 'src/app/modelo/Estudio';
import { ProgresoEstudio } from 'src/app/modelo/progreso-estudio';

@Component({
  selector: 'app-estudio-add',
  templateUrl: './estudio-add.component.html',
  styleUrls: ['./estudio-add.component.css'],
})
export class EstudioAddComponent implements OnInit {
  estudioForm: FormGroup;
  estadosProgresoEstudio = ProgresoEstudio;
  @Output() onAddEstudio = new EventEmitter<Estudio>();
  @Output() onUpdateEstudio = new EventEmitter<Estudio>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public estudioEnEdicion: Estudio
  ) {
    this.estudioForm = this.formBuilder.group({
      institucion: ['', [Validators.required, Validators.minLength(3)]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      lugar: [''],
      estado: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.estudioEnEdicion) {
      this.estudioForm.patchValue(this.estudioEnEdicion);
    }
  }

  onSubmit() {
    if (this.estudioEnEdicion) {
      this.estudioEnEdicion.institucion = this.estudioForm.controls['institucion'].value;
      this.estudioEnEdicion.titulo = this.estudioForm.controls['titulo'].value;
      this.estudioEnEdicion.lugar = this.estudioForm.controls['lugar'].value;
      this.estudioEnEdicion.estado = this.estudioForm.controls['estado'].value;
      this.onUpdateEstudio.emit(this.estudioEnEdicion);
    } else {
      this.onAddEstudio.emit(this.estudioForm.value);
    }
  }

  get institucion() {
    return this.estudioForm.get('institucion');
  }

  get titulo() {
    return this.estudioForm.get('titulo');
  }

  get lugar() {
    return this.estudioForm.get('lugar');
  }

  get estado() {
    return this.estudioForm.get('estado');
  }
}
