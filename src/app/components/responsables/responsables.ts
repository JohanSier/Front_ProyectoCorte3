import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ResponsablesService } from '../../services/responsables';

@Component({
  selector: 'app-responsables',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './responsables.html',
  styleUrl: './responsables.scss',
})
export class Responsables {
  form: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private service: ResponsablesService) {
    this.form = this.fb.group({
      identificacion: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      tieneVariosNinos: [false],
      nombresNinos: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  get nombresNinos(): FormArray {
    return this.form.get('nombresNinos') as FormArray;
  }

  agregarNino() {
    this.nombresNinos.push(this.fb.control('', Validators.required));
  }

  eliminarNino(index: number) {
    if (this.nombresNinos.length > 1) {
      this.nombresNinos.removeAt(index);
    }
  }

  limpiar() {
    this.form.reset({ tieneVariosNinos: false });
    while (this.nombresNinos.length > 1) this.nombresNinos.removeAt(1);
    this.nombresNinos.at(0).setValue('');
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.limpiar();
        this.submitting = false;
      },
      error: (err) => {
        const msg = err.status === 409
          ? 'Un niño ya está registrado con otro responsable'
          : 'Error al registrar';
        alert(msg);
        this.submitting = false;
      }
    });
  }
}
