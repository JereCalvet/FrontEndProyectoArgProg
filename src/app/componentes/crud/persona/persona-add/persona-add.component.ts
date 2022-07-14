import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nacionalidad } from 'src/app/modelo/nacionalidad';
import { Persona } from 'src/app/modelo/persona';

@Component({
  selector: 'app-persona-add',
  templateUrl: './persona-add.component.html',
  styleUrls: ['./persona-add.component.css'],
})
export class PersonaAddComponent implements OnInit {
  personaForm: FormGroup;
  listadoNacionalidades = Nacionalidad;
  minDate = new Date(1800, 1, 1);
  maxDate = new Date();
  formTitulo: string;
  @Output() onAddPersona = new EventEmitter<Persona>();
  @Output() onUpdatePersona = new EventEmitter<Persona>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public personaEnEdicion: Persona
  ) {
    this.personaForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ocupacion: [''],
      descripcion: [''],
      nacionalidad: [null, [Validators.required]],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    if (this.personaEnEdicion) {
      this.personaForm.patchValue(this.personaEnEdicion);
      this.formTitulo = 'Editar persona';
    } else {
      this.formTitulo = 'Agregar persona';
    }
  }

  onSubmit() {
    if (this.personaEnEdicion) {
      this.personaEnEdicion.nombres = this.personaForm.controls['nombres'].value;
      this.personaEnEdicion.apellidos = this.personaForm.controls['apellidos'].value;
      this.personaEnEdicion.fechaNacimiento = this.personaForm.controls['fechaNacimiento'].value;
      this.personaEnEdicion.email = this.personaForm.controls['email'].value;
      this.personaEnEdicion.ocupacion = this.personaForm.controls['ocupacion'].value;
      this.personaEnEdicion.descripcion = this.personaForm.controls['descripcion'].value;
      this.personaEnEdicion.nacionalidad = this.personaForm.controls['nacionalidad'].value;
      this.personaEnEdicion.imagen = this.personaForm.controls['imagen'].value;
      this.onUpdatePersona.emit(this.personaEnEdicion);
    } else {
      this.onAddPersona.emit(this.personaForm.value);
    }
  }

  get nombres() {
    return this.personaForm.get('nombres');
  }

  get apellidos() {
    return this.personaForm.get('apellidos');
  }

  get fechaNacimiento() {
    return this.personaForm.get('fechaNacimiento');
  }

  get email() {
    return this.personaForm.get('email');
  }

  get descripcion() {
    return this.personaForm.get('descripcion');
  }

  get ocupacion() {
    return this.personaForm.get('ocupacion');
  }

  get nacionalidad() {
    return this.personaForm.get('nacionalidad');
  }

  get imagen() {
    return this.personaForm.get('imagen');
  }
}
