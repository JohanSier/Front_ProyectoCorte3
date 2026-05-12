import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColaboradorService } from '../../services/colaborador-service';
import { Colaborador } from '../../modelo/colaborador';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableModule, InputTextModule],
  templateUrl: './colaborador-list.html',
  styleUrl: './colaborador-list.scss'
})
export class ColaboradorList implements OnInit {

  colaboradores: Colaborador[] = [];
  filteredColaboradores: Colaborador[] = [];
  searchTerm = '';
  tableLoading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.cargarColaboradores();
  }

  cargarColaboradores(): void {
    this.tableLoading = true;
    this.colaboradorService.getColaboradores().subscribe({
      next: (data) => {
        this.colaboradores = data;
        this.filteredColaboradores = data;
        this.tableLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error de conexión:', err);
        this.tableLoading = false;
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredColaboradores = this.colaboradores;
      return;
    }
    this.filteredColaboradores = this.colaboradores.filter(c =>
      `${c.nombres} ${c.apellidos}`.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.numeroDocumento?.toLowerCase().includes(term) ||
      c.ciudad?.toLowerCase().includes(term)
    );
  }

  getInitials(nombres: string, apellidos: string): string {
    const n = nombres?.charAt(0)?.toUpperCase() ?? '';
    const a = apellidos?.charAt(0)?.toUpperCase() ?? '';
    return `${n}${a}`;
  }

  get colaboradoresFemenino(): number {
    return this.colaboradores.filter(c =>
      c.genero?.toLowerCase() === 'femenino'
    ).length;
  }

  get colaboradoresMasculino(): number {
    return this.colaboradores.filter(c =>
      c.genero?.toLowerCase() === 'masculino'
    ).length;
  }

  get ciudadesUnicas(): number {
    return new Set(this.colaboradores.map(c => c.ciudad).filter(Boolean)).size;
  }
}





/* 
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
 */