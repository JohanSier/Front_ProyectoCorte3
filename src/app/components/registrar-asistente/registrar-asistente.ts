import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Asistente } from '../../modelo/asistente';
import { AsistenteService } from '../../services/asistente-service';

@Component({
  selector: 'app-registrar-asistente',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './registrar-asistente.html',
  styleUrls: ['./registrar-asistente.scss'],
})
export class RegistrarAsistente {
  hoy: string = new Date().toISOString().split('T')[0];
  mostrarModal = false;
  errorMensaje = '';

  asistentesTemporalesValidos = ['98765', '123456', '55555'];

  asistente: Asistente = {
    identificacion: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    edad: 0,
    genero: '',
    barrio: '',
    identificacionResponsable: '',
    estadoAsistente: 'Activo',
    fechaIngreso: this.hoy,
  };

  constructor(private asistenteService: AsistenteService) {}

  guardar() {
    this.errorMensaje = '';

    if (!this.asistente.identificacion.trim()) {
      this.errorMensaje = 'La identificación no puede estar vacía.';
      return;
    }

    if (!this.asistente.nombreCompleto.trim()) {
      this.errorMensaje = 'El nombre completo no puede estar vacío.';
      return;
    }

    if (!this.asistente.fechaNacimiento) {
      this.errorMensaje = 'La fecha de nacimiento es obligatoria.';
      return;
    }

    if (this.asistente.edad === null || this.asistente.edad === undefined) {
      this.errorMensaje = 'La edad es obligatoria.';
      return;
    }

    if (Number(this.asistente.edad) >= 16) {
      this.errorMensaje = 'El asistente debe ser menor de 16 años.';
      return;
    }

    if (!this.asistente.genero) {
      this.errorMensaje = 'Debe seleccionar un género.';
      return;
    }

    if (!this.asistente.barrio.trim()) {
      this.errorMensaje = 'El barrio no puede estar vacío.';
      return;
    }

    if (!this.asistente.identificacionResponsable.trim()) {
      this.errorMensaje = 'La identificación del responsable es obligatoria.';
      return;
    }

    if (
      !this.asistentesTemporalesValidos.includes(this.asistente.identificacionResponsable.trim())
    ) {
      this.errorMensaje = 'La identificación del responsable no existe en el sistema.';
      return;
    }

    if (!this.asistente.fechaIngreso) {
      this.errorMensaje = 'La fecha de ingreso es obligatoria.';
      return;
    }

    if (!this.edadCoincideConFecha()) {
      this.errorMensaje = 'La edad no coincide con la fecha de nacimiento.';
      return;
    }

    this.asistenteService.addAsistente(this.asistente).subscribe({
      next: () => {
        this.mostrarModal = true;
      },
      error: (err) => {
        this.errorMensaje =
          err?.error?.mensaje ||
          err?.error?.message ||
          'Error al registrar el asistente. Verifique los datos e intente de nuevo.';
      },
    });
  }

  edadCoincideConFecha(): boolean {
    if (!this.asistente.fechaNacimiento) return false;

    const nacimiento = new Date(this.asistente.fechaNacimiento + 'T00:00:00');
    const hoy = new Date();

    let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalculada--;
    }

    return edadCalculada === Number(this.asistente.edad);
  }

  aceptarModal() {
    this.mostrarModal = false;
    this.limpiarFormulario();
  }

  cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.asistente = {
      identificacion: '',
      nombreCompleto: '',
      fechaNacimiento: '',
      edad: 0,
      genero: '',
      barrio: '',
      identificacionResponsable: '',
      estadoAsistente: 'Activo',
      fechaIngreso: this.hoy,
    };

    this.errorMensaje = '';
  }
}
