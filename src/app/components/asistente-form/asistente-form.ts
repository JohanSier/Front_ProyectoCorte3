import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsistenteService } from '../../services/asistente-service';

@Component({
  selector: 'app-asistente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asistente-form.html'
})
export class AsistenteForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asistenteService: AsistenteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      identificacion: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      genero: ['', Validators.required],
      barrio: ['', Validators.required],
      identificacionResponsable: ['', Validators.required],
      estadoAsistente: ['Activo', Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  ngOnInit() {}
  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.asistenteService.addAsistente(this.form.value).subscribe({
      next: () => {
        alert('¡Asistente registrado correctamente!');
        this.router.navigate(['/asistentes/listar']);
      },
      error: (err) => {
        const mensaje = err?.error?.mensaje || 'Ocurrió un error al registrar el asistente.';
        alert(mensaje);
      }
    });
  }

 calcularEdad(fechaNacimiento: string) {

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (
    mes < 0 ||
    (mes === 0 && hoy.getDate() < nacimiento.getDate())
  ) {
    edad--;
  }

  this.form.get('edad')?.setValue(edad);

}
}
