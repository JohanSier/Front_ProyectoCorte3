import { Routes } from '@angular/router';
import { DocenteList } from './components/docente-list/docente-list';
import { DocenteForm } from './components/docente-form/docente-form';
import { AyudaForm } from './components/ayuda-form/ayuda-form';

export const routes: Routes = [
  { path: 'listar', component: DocenteList },
  { path: 'crear', component: DocenteForm },
  { path: 'registrar-ayuda', component: AyudaForm },  // ← agregar
  { path: '', redirectTo: 'registrar-ayuda', pathMatch: 'full' }, // ← redirige a tu HU
  { path: '**', redirectTo: 'registrar-ayuda' }
];
