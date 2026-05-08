import { Routes } from '@angular/router';
import {ColaboradorList} from './components/docente-list/colaborador-list';
import {ColaboradorForm} from './components/docente-form/colaborador-form';

export const routes: Routes = [
  { path: 'listar', component: ColaboradorList },
  { path: 'crear', component: ColaboradorForm },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: 'listar' }
];
