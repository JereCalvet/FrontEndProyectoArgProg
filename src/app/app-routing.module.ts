import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaItemComponent } from './componentes/crud/persona/persona-item/persona-item.component';
import { PersonasComponent } from './componentes/crud/persona/personas/personas.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: 'personas', component: PersonasComponent },
  { path: 'persona/:id', component: PersonaItemComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'personas', pathMatch: 'full' },
  { path: '**', redirectTo: 'personas' }, // ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
