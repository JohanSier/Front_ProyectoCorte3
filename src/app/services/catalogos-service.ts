import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TIPOS_SERVICIO } from '../data/tipos-servicio.data';
import { ESTADOS_USUARIO } from '../data/estados-usuario.data';
import { USUARIOS } from '../data/usuarios';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  getTiposServicio() {
    return TIPOS_SERVICIO;
  }

  getEstadosUsuario() {
    return ESTADOS_USUARIO;
  }

  getUsuarios() {
    return USUARIOS;
  }

}