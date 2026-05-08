import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColaboradorService } from '../../services/colaborador-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-colaborador-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './colaborador-form.html'
})
export class ColaboradorForm implements OnInit {

  form: FormGroup;
  tiposDocumento: { valor: string, descripcion: string }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly colaboradorService: ColaboradorService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.colaboradorService.getTiposDocumento().subscribe(data => {
      this.tiposDocumento = data;
    });
  }

  guardar() {
    if (this.form.valid) {
      this.colaboradorService.addColaborador(this.form.value).subscribe({
        next: () => {
          alert('¡Colaborador creado!');
          this.router.navigate(['/listar']);
        }
      });
    }
  }
}















/* import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ColaboradorService} from '../../services/colaborador-service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';


@Component({
  selector: 'app-colaborador-form',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './colaborador-form.html'
})
export class ColaboradorForm {
  form: FormGroup;

  constructor(private readonly  fb: FormBuilder, private readonly  colaboradorService: ColaboradorService,
              private readonly router: Router) {
    this.form = this.fb.group({

      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required]

    });
  }

  guardar() {
    if (this.form.valid) {
      this.colaboradorService.addColaborador(this.form.value).subscribe({
        next: () => {
          alert('¡Colaborador creado!');
          this.router.navigate(['/listar']);
        }
      });
    }
  }
}
 */