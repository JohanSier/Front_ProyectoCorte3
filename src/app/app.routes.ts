import { Routes } from '@angular/router';
import { AsistenteList } from './components/asistente-list/asistente-list';
import { RegistrarAsistente } from './components/registrar-asistente/registrar-asistente';
import { RegistrarAsistencia } from './components/registrar-asistencia/registrar-asistencia';
import { ColaboradorList } from './components/colaborador-list/colaborador-list';
import { ColaboradorForm } from './components/colaborador-form/colaborador-form';
import { Responsables } from './components/responsables/responsables';
import { AyudaForm } from './components/ayuda-form/ayuda-form';

export const routes: Routes = [
  { path: 'registrar-asistente', component: RegistrarAsistente },
  { path: 'asistentes/crear', component: RegistrarAsistente },
  { path: 'registrar-asistencia', component: RegistrarAsistencia },
  { path: 'listar-asistentes', component: AsistenteList },
  { path: 'registrar-responsable', component: Responsables },
  { path: 'registrar-ayuda', component: AyudaForm },
  { path: 'listar-colaborador', component: ColaboradorList },
  { path: 'crear-colaborador', component: ColaboradorForm },
  { path: '', redirectTo: 'listar-colaborador', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar-colaborador' },
];
