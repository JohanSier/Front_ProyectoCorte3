import { Routes } from '@angular/router';
import { AsistenteList } from './components/asistente-list/asistente-list';
import { AsistenteForm } from './components/asistente-form/asistente-form';
import { RegistrarAsistente } from './components/registrar-asistente/registrar-asistente';
import { RegistrarAsistencia } from './components/registrar-asistencia/registrar-asistencia';
import { ColaboradorList } from './components/colaborador-list/colaborador-list';
import { ColaboradorForm } from './components/colaborador-form/colaborador-form';
import { Responsables } from './pages/responsables/responsables';
import { AyudaForm } from './components/ayuda-form/ayuda-form'; //cambiar ruta cuando se agreguen mis archivos


export const routes: Routes = [
  { path: 'listar', component: ColaboradorList },
  { path: 'crear', component: ColaboradorForm },
  { path: 'registrar-asistente', component: RegistrarAsistente },
  { path: 'registrar-asistencia', component: RegistrarAsistencia },
  { path: 'asistentes/listar', component: AsistenteList },
  { path: 'asistentes/crear', component: AsistenteForm },
  { path: 'responsables', component: Responsables },
  { path: 'registrar-ayuda', component: AyudaForm },  // ← agregar
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar' }
];
