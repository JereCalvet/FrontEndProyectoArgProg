import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubcription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AutenticacionService,
    private router: Router,
    private toasterSvc: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loginSubcription = this.authSvc.login(this.loginForm.value).subscribe({
      next: () => {
        this.toasterSvc.success('Login correcto.', 'Exito');
        this.router.navigate(['/personas']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Forbidden) {
          this.toasterSvc.error('Usuario o contraseña incorrectos.', 'Error');
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
  }
}
