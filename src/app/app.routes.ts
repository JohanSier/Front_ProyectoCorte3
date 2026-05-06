import { Routes } from '@angular/router';
import {DocenteList} from './components/docente-list/docente-list';
import {DocenteForm} from './components/docente-form/docente-form';

export const routes: Routes = [
  { path: 'listar', component: DocenteList },
  { path: 'crear', component: DocenteForm },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar' }
];
