import { Injectable } from '@angular/core';
import { TIPOS_SERVICIO } from '../data/tipos-servicio.data';
import { ESTADOS_USUARIO } from '../data/estados-usuario.data';

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


}