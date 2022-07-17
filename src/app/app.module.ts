import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MaterialDesignModule } from './modulos/material-design/material-design.module';

//componentes
import { LoginComponent } from './componentes/login/login.component';
import { ProyectoItemComponent } from './componentes/crud/proyecto/proyecto-item/proyecto-item.component';
import { ProyectosComponent } from './componentes/crud/proyecto/proyectos/proyectos.component';
import { ProyectoAddComponent } from './componentes/crud/proyecto/proyecto-add/proyecto-add.component';
import { PersonasComponent } from './componentes/crud/persona/personas/personas.component';
import { PersonaItemComponent } from './componentes/crud/persona/persona-item/persona-item.component';
import { TrabajosComponent } from './componentes/crud/trabajo/trabajos/trabajos.component';
import { TrabajoItemComponent } from './componentes/crud/trabajo/trabajo-item/trabajo-item.component';
import { TrabajoAddComponent } from './componentes/crud/trabajo/trabajo-add/trabajo-add.component';
import { EstudioAddComponent } from './componentes/crud/estudio/estudio-add/estudio-add.component';
import { EstudioItemComponent } from './componentes/crud/estudio/estudio-item/estudio-item.component';
import { EstudiosComponent } from './componentes/crud/estudio/estudios/estudios.component';
import { HabilidadesComponent } from './componentes/crud/habilidad/habilidades/habilidades.component';
import { HabilidadAddComponent } from './componentes/crud/habilidad/habilidad-add/habilidad-add.component';
import { HabilidadItemComponent } from './componentes/crud/habilidad/habilidad-item/habilidad-item.component';
import { PersonaAddComponent } from './componentes/crud/persona/persona-add/persona-add.component';

//servicios
import { JwtInterceptorService } from './servicios/autenticacion/jwt-interceptor.service';
import { LoadingInterceptor } from './ui/loading.interceptor';
import { BotonLoginComponent } from './componentes/login/boton-login/boton-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProyectoItemComponent,
    ProyectosComponent,
    ProyectoAddComponent,
    PersonasComponent,
    PersonaItemComponent,
    TrabajosComponent,
    TrabajoItemComponent,
    TrabajoAddComponent,
    EstudioAddComponent,
    EstudioItemComponent,
    EstudiosComponent,
    HabilidadesComponent,
    HabilidadAddComponent,
    HabilidadItemComponent,
    PersonaAddComponent,
    BotonLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialDesignModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    //PorfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
