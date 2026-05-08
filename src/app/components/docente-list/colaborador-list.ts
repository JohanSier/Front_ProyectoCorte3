
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColaboradorService} from '../../services/colaborador-service';
import {Colaborador} from '../../modelo/colaborador';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [CommonModule, TableModule], // Lo mantenemos por buena práctica
  providers: [ColaboradorService, CardModule],
  templateUrl: './colaborador-list.html'
})
export class ColaboradorList implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor(private cd: ChangeDetectorRef,
              private colaboradorService: ColaboradorService) {

  }

  ngOnInit(): void {
    this.cargarColaboradores()
  }
  cargarColaboradores() : void{
    this.colaboradorService.getColaboradores().subscribe({
      next: (data) => {
        //console.log('Datos recibidos:', data);
        this.colaboradores = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Error de conexión:', err)
    });
  }
}
