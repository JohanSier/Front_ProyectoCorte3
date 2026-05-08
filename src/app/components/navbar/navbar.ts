import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { MenubarModule} from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule, MenubarModule, RouterModule, ToolbarModule, ButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  items = [
    {
      label: 'Gestión Docentes',
      routerLink: '/'
    },
    {
      label: 'Listado',
      routerLink: '/listar'
    },
    {
      label: 'Nuevo',
      routerLink: '/crear'
    }
  ];
}
