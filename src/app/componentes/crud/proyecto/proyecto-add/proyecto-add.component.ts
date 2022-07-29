import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/modelo/Proyecto';

@Component({
  selector: 'app-proyecto-add',
  templateUrl: './proyecto-add.component.html',
  styleUrls: ['./proyecto-add.component.css'],
})
export class ProyectoAddComponent implements OnInit {
  proyectoForm: FormGroup;
  formTitulo: string;
  @Output() onAddProyecto = new EventEmitter<Proyecto>();
  @Output() onUpdateProyecto = new EventEmitter<Proyecto>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public proyectoEnEdicion: Proyecto
  ) {
    this.proyectoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    if (this.proyectoEnEdicion) {
      this.proyectoForm.patchValue(this.proyectoEnEdicion);
      this.formTitulo = 'Editar proyecto';
    } else {
      this.formTitulo = 'Agregar proyecto';
    }
  }

  onSubmit() {
    if (this.proyectoEnEdicion) {
      this.proyectoEnEdicion.nombre = this.proyectoForm.controls['nombre'].value;
      this.proyectoEnEdicion.descripcion = this.proyectoForm.controls['descripcion'].value;
      this.onUpdateProyecto.emit(this.proyectoEnEdicion);
    } else {
      this.onAddProyecto.emit(this.proyectoForm.value);
    }
  }

  get nombre() {
    return this.proyectoForm.get('nombre');
  }

  get descripcion() {
    return this.proyectoForm.get('descripcion');
  }
}
