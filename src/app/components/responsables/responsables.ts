import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ResponsablesService } from '../../services/responsables';

@Component({
  selector: 'app-responsables',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './responsables.html',
  styleUrl: './responsables.scss',
})
export class Responsables {
  form: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private service: ResponsablesService, private snack: MatSnackBar) {
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

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.snack.open('Responsable registrado exitosamente', 'Cerrar', { duration: 3000 });
        this.form.reset({ tieneVariosNinos: false });
        while (this.nombresNinos.length > 1) this.nombresNinos.removeAt(1);
        this.nombresNinos.at(0).setValue('');
        this.submitting = false;
      },
      error: (err) => {
        const msg = err.status === 409 ? 'Un niño ya está registrado con otro responsable' : 'Error al registrar';
        this.snack.open(msg, 'Cerrar', { duration: 4000 });
        this.submitting = false;
      }
    });
  }
}
