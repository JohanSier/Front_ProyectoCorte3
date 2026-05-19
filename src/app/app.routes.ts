import { Routes } from '@angular/router';
import { RegistrarAsistente } from './components/registrar-asistente/registrar-asistente';
import { RegistrarAsistencia } from './components/registrar-asistencia/registrar-asistencia';

export const routes: Routes = [
  { path: 'registrar-asistente', component: RegistrarAsistente },
  { path: 'registrar-asistencia', component: RegistrarAsistencia },
  { path: '', redirectTo: 'registrar-asistente', pathMatch: 'full' },
  { path: '**', redirectTo: 'registrar-asistente' }
];
