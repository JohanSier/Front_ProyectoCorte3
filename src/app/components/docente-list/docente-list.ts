import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { DocenteService, DocenteDto } from '../../services/docente-service';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './docente-list.html',
  styleUrl: './docente-list.scss',
})
export class DocenteList implements OnInit {
  form: FormGroup;
  docentes: DocenteDto[] = [];
  displayedColumns = ['nombre', 'apellido', 'email'];
  loading = false;
  submitting = false;

  constructor(private fb: FormBuilder, private service: DocenteService, private snack: MatSnackBar) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => { this.docentes = data; this.loading = false; },
      error: () => { this.snack.open('Error al cargar docentes', 'Cerrar', { duration: 3000 }); this.loading = false; }
    });
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.service.create(this.form.value).subscribe({
      next: () => {
        this.snack.open('Docente registrado exitosamente', 'Cerrar', { duration: 3000 });
        this.form.reset();
        this.cargarDocentes();
        this.submitting = false;
      },
      error: () => {
        this.snack.open('Error al registrar docente', 'Cerrar', { duration: 3000 });
        this.submitting = false;
      }
    });
  }
}
