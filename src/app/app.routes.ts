import { Routes } from '@angular/router';
import { AsistenteList } from './components/asistente-list/asistente-list';
import { AsistenteForm } from './components/asistente-form/asistente-form';
import { RegistrarAsistencia } from './components/registrar-asistencia/registrar-asistencia';
import { ColaboradorList } from './components/colaborador-list/colaborador-list';
import { ColaboradorForm } from './components/colaborador-form/colaborador-form';
import { Responsables } from './pages/responsables/responsables';
import { AyudaForm } from './components/ayuda-form/ayuda-form'; //cambiar ruta cuando se agreguen mis archivos


export const routes: Routes = [
  { path: 'registrar-asistente', component: AsistenteForm },
  { path: 'registrar-asistencia', component: RegistrarAsistencia },
  { path: 'listar-asistentes', component: AsistenteList },
  { path: 'registrar-responsable', component: Responsables },
  { path: 'registrar-ayuda', component: AyudaForm },
  { path: 'listar-colaborador', component: ColaboradorList },
  { path: 'crear-colaborador', component: ColaboradorForm },
  { path: '', redirectTo: 'listar-colaborador', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar-colaborador' }
];
