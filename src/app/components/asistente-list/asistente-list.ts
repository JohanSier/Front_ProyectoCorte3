import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenteService } from '../../services/asistente-service';
import { Asistente } from '../../modelo/asistente';

@Component({
  selector: 'app-asistente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistente-list.html'
})
export class AsistenteList implements OnInit {
  asistentes: Asistente[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private asistenteService: AsistenteService
  ) {}

  ngOnInit(): void {
    this.cargarAsistentes();
  }

  cargarAsistentes(): void {
    this.asistenteService.getAsistentes().subscribe({
      next: (data) => {
        this.asistentes = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error de conexión:', err)
    });
  }
}
