import { Routes } from '@angular/router';
import { RegistrarAsistente } from './components/registrar-asistente/registrar-asistente';
import { RegistrarAsistencia } from './components/registrar-asistencia/registrar-asistencia';
import { ColaboradorList } from './components/colaborador-list/colaborador-list';
import { ColaboradorForm } from './components/colaborador-form/colaborador-form';
import { Responsables } from './pages/responsables/responsables';

export const routes: Routes = [
  { path: 'listar', component: ColaboradorList },
  { path: 'crear', component: ColaboradorForm },
  { path: 'registrar-asistente', component: RegistrarAsistente },
  { path: 'registrar-asistencia', component: RegistrarAsistencia },
  { path: 'responsables', component: Responsables },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar' }
];
