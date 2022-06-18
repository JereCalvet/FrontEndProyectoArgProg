import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trabajo } from 'src/app/modelo/Trabajo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-trabajo-add',
  templateUrl: './trabajo-add.component.html',
  styleUrls: ['./trabajo-add.component.css'],
})
export class TrabajoAddComponent implements OnInit {
  trabajoForm: FormGroup;
  @Output() onAddTrabajo = new EventEmitter<Trabajo>();
  @Output() onUpdateTrabajo = new EventEmitter<Trabajo>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public trabajoEnEdicion: Trabajo
  ) {
    this.trabajoForm = this.formBuilder.group({
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', [Validators.required, Validators.minLength(3)]],
      lugar: [''],
      desde: ['', [Validators.required]],
      hasta: ['', [Validators.required]],
    });
    console.log(this.trabajoForm);
  }

  ngOnInit(): void {
    if (this.trabajoEnEdicion) {
      this.trabajoForm.patchValue(this.trabajoEnEdicion);
    }
  }

  onSubmit() {
    if (this.trabajoEnEdicion) {
      this.trabajoEnEdicion.empresa = this.trabajoForm.controls['empresa'].value;
      this.trabajoEnEdicion.cargo = this.trabajoForm.controls['cargo'].value;
      this.trabajoEnEdicion.lugar = this.trabajoForm.controls['lugar'].value;
      this.trabajoEnEdicion.desde = this.trabajoForm.controls['desde'].value;
      this.trabajoEnEdicion.hasta = this.trabajoForm.controls['hasta'].value;
      this.onUpdateTrabajo.emit(this.trabajoEnEdicion);
    } else {
      this.onAddTrabajo.emit(this.trabajoForm.value);
    }
  }

  get empresa() {
    return this.trabajoForm.get('empresa');
  }

  get cargo() {
    return this.trabajoForm.get('cargo');
  }

  get lugar() {
    return this.trabajoForm.get('lugar');
  }

  get desde() {
    return this.trabajoForm.get('desde');
  }

  get hasta() {
    return this.trabajoForm.get('hasta');
  }
}
