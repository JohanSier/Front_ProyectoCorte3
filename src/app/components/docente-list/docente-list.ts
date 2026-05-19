
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocenteService} from '../../services/docente-service';
import {createStructuredContentOutput} from '@angular/cli/src/commands/mcp/utils';
import {Docente} from '../../modelo/docente';


@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [CommonModule], // Lo mantenemos por buena práctica
  templateUrl: './docente-list.html'
})
export class DocenteList implements OnInit {
  docentes: Docente[] = [];

  constructor(private cd: ChangeDetectorRef,
              private docenteService: DocenteService) {

  }

  ngOnInit(): void {
    this.cargarDocentes()
  }
  cargarDocentes() : void{
    this.docenteService.getDocentes().subscribe({
      next: (data) => {
        //console.log('Datos recibidos:', data);
        this.docentes = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error de conexión:', err)
    });
  }
}
