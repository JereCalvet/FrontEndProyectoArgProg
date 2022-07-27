import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loginSubcription: Subscription;
  registerSubcription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AutenticacionService,
    private router: Router,
    private toasterSvc: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    this.registerSubcription = this.authSvc.register(this.registerForm.value).subscribe({
      next: () => {
        this.registerSubcription = this.authSvc.login(this.registerForm.value).subscribe({
          next: () => {
            this.toasterSvc.success('Registro correcto.', 'Exito');
            this.router.navigate(['/personas']);
          },
          error: (err: HttpErrorResponse) => {
            this.toasterSvc.error(
              `Error de conexión. Codigo: ${err.status} ${err.message}`,
              'Error'
            );
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Conflict) {
          this.toasterSvc.error('Ya existe un usuario con ese correo electronico.', 'Error');
        } else {
          this.toasterSvc.error(`Error de conexión. Codigo: ${err.status} ${err.message}`, 'Error');
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubcription) {
      this.loginSubcription.unsubscribe();
    }

    if (this.registerSubcription) {
      this.registerSubcription.unsubscribe();
    }
  }
}
