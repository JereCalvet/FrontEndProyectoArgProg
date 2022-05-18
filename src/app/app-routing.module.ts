import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PersonadetalleComponent } from './componentes/personadetalle/personadetalle.component';
import { PersonasComponent } from './componentes/personas/personas.component';

const routes: Routes = [
  { path: 'personas', component: PersonasComponent },
  { path: 'persona/:id', component: PersonadetalleComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // si no hay ruta al login
  { path: '**', redirectTo: 'personas' }, // ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
