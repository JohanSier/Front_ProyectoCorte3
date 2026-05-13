import { Routes } from '@angular/router';
import { Responsables } from './pages/responsables/responsables';

export const routes: Routes = [
  { path: '', redirectTo: 'responsables', pathMatch: 'full' },
  { path: 'responsables', component: Responsables },
];
