import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habilidad } from 'src/app/modelo/Habilidad';

@Component({
  selector: 'app-habilidad-add',
  templateUrl: './habilidad-add.component.html',
  styleUrls: ['./habilidad-add.component.css'],
})
export class HabilidadAddComponent implements OnInit {
  habilidadForm: FormGroup;
  formTitulo: string;
  @Output() onAddHabilidad = new EventEmitter<Habilidad>();
  @Output() onUpdateHabilidad = new EventEmitter<Habilidad>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public habilidadEnEdicion: Habilidad
  ) {
    this.habilidadForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      nivel: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    if (this.habilidadEnEdicion) {
      this.habilidadForm.patchValue(this.habilidadEnEdicion);
      this.formTitulo = 'Editar habilidad';
    } else {
      this.formTitulo = 'Agregar habilidad';
    }
  }

  onSubmit() {
    if (this.habilidadEnEdicion) {
      this.habilidadEnEdicion.nombre = this.habilidadForm.controls['nombre'].value;
      this.habilidadEnEdicion.nivel = this.habilidadForm.controls['nivel'].value;
      this.habilidadEnEdicion.descripcion = this.habilidadForm.controls['descripcion'].value;
      this.onUpdateHabilidad.emit(this.habilidadEnEdicion);
    } else {
      this.onAddHabilidad.emit(this.habilidadForm.value);
    }
  }

  get nombre() {
    return this.habilidadForm.get('nombre');
  }

  get nivel() {
    return this.habilidadForm.get('nivel');
  }

  get descripcion() {
    return this.habilidadForm.get('descripcion');
  }
}
