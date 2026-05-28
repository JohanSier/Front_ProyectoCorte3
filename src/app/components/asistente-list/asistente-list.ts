import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asistente } from '../../modelo/asistente';
import { AsistenteService } from '../../services/asistente-service';

@Component({
  selector: 'app-asistente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistente-list.html',
  styleUrls: ['./asistente-list.scss'],
})
export class AsistenteList implements OnInit {
  asistentes: Asistente[] = [];
  cargando = true;
  errorMensaje = '';

  constructor(private asistenteService: AsistenteService) {}

  ngOnInit(): void {
    this.cargarAsistentes();
  }

  cargarAsistentes(): void {
    this.cargando = true;
    this.errorMensaje = '';

    this.asistenteService.getAsistentes().subscribe({
      next: (data) => {
        this.asistentes = data || [];
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje =
          err?.error?.mensaje ||
          err?.error?.message ||
          'No se pudo cargar el listado de asistentes.';
        this.cargando = false;
      },
    });
  }

  obtenerEstadoClase(estado: string): string {
    if (!estado) return 'estado-chip estado-inactivo';

    return estado.toLowerCase() === 'activo'
      ? 'estado-chip estado-activo'
      : 'estado-chip estado-inactivo';
  }
}
