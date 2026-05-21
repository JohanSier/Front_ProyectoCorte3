import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AyudaService } from '../../services/ayuda-service';
import { Ayuda } from '../../modelo/ayuda';

@Component({
  selector: 'app-ayuda-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ayuda-form.html',
  styleUrl: './ayuda-form.scss'
})
export class AyudaForm {

  hoy: string = new Date().toISOString().split('T')[0];
  mostrarModal = false;
  errorMensaje = '';

  responsables = [
    { id: 1, nombre: 'María García' },
    { id: 2, nombre: 'Carlos López' },
    { id: 3, nombre: 'Ana Martínez' }
  ];

  idResponsableSeleccionado: number = 0;

  ayuda: Ayuda = {
    tipo: 'DINERO',
    idColaborador: 1,
    nombreColaborador: '',
    descripcion: '',
    valor: undefined,
    cantidad: undefined,
    fechaRegistro: this.hoy
  };

  constructor(private ayudaService: AyudaService) {}

  onTipoChange() {
    this.ayuda.valor = undefined;
    this.ayuda.cantidad = undefined;
  }

  guardar() {
    this.errorMensaje = '';

    if (!this.ayuda.tipo) {
      this.errorMensaje = 'El tipo de ayuda es requerido.'; return;
    }
    if (!this.ayuda.nombreColaborador?.trim()) {
      this.errorMensaje = 'El nombre del donante no puede estar vacío.'; return;
    }
    if (!this.ayuda.fechaRegistro) {
      this.errorMensaje = 'La fecha de registro es requerida.'; return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaIngresada = new Date(this.ayuda.fechaRegistro + 'T00:00:00');
    if (fechaIngresada > hoy) {
      this.errorMensaje = 'La fecha de registro no puede ser futura.'; return;
    }

    if (!this.ayuda.descripcion?.trim()) {
      this.errorMensaje = 'La descripción no puede estar vacía.'; return;
    }

    if (this.ayuda.tipo === 'DINERO') {
      if (!this.ayuda.valor || isNaN(this.ayuda.valor) || this.ayuda.valor <= 0) {
        this.errorMensaje = 'El valor debe ser numérico y mayor a 0.'; return;
      }
    }

    if (this.ayuda.tipo === 'EN_ESPECIE') {
      if (!this.ayuda.cantidad || isNaN(this.ayuda.cantidad) || this.ayuda.cantidad <= 0) {
        this.errorMensaje = 'La cantidad debe ser numérica y mayor a 0.'; return;
      }
    }

    if (!this.idResponsableSeleccionado || this.idResponsableSeleccionado === 0) {
      this.errorMensaje = 'Debe seleccionar un responsable registrado en el sistema.'; return;
    }

    this.ayudaService.registrar(this.ayuda).subscribe({
      next: () => { this.mostrarModal = true; },
      error: () => {
        this.errorMensaje = 'Error al registrar la ayuda. Verifique los datos e intente de nuevo.';
      }
    });
  }

  aceptarModal() {
    this.mostrarModal = false;
    this.limpiarFormulario();
  }

  cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.ayuda = {
      tipo: 'DINERO',
      idColaborador: 1,
      nombreColaborador: '',
      descripcion: '',
      valor: undefined,
      cantidad: undefined,
      fechaRegistro: this.hoy
    };
    this.idResponsableSeleccionado = 0;
    this.errorMensaje = '';
  }
}
