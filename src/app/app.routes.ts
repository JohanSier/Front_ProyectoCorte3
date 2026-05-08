import { Routes } from '@angular/router';
import { AsistenteList } from './components/asistente-list/asistente-list';
import { AsistenteForm } from './components/asistente-form/asistente-form';

export const routes: Routes = [
  { path: 'asistentes/listar', component: AsistenteList },
  { path: 'asistentes/crear', component: AsistenteForm },
  { path: '', redirectTo: 'asistentes/listar', pathMatch: 'full' },
  { path: '**', redirectTo: 'asistentes/listar' }
];
