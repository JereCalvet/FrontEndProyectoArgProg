import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//material design
import { MaterialDesignModule } from './modulos/material-design/material-design.module';

//componentes
import { LoginComponent } from './componentes/login/login.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { PersonadetalleComponent } from './componentes/personadetalle/personadetalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonasComponent,
    PersonadetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
