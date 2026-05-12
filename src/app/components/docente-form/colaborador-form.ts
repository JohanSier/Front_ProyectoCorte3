import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  templateUrl: './colaborador-form.html',
  styleUrls: ['./colaborador-form.scss', './colaborador-form-extras.scss']
})
export class ColaboradorForm implements OnInit {

  form: FormGroup;
  tiposDocumento: { valor: string, descripcion: string }[] = [];
  currentStep = 1;
  totalSteps = 3;
  loading = false;

  // Fields per step — used for validation gating
  private stepFields: Record<number, string[]> = {
    1: ['tipoDocumento', 'numeroDocumento', 'nombres', 'apellidos', 'genero'],
    2: ['email', 'telefono', 'direccion', 'ciudad'],
    3: ['fechaIngreso', 'fechaNacimiento'],
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly colaboradorService: ColaboradorService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      tipoDocumento:   ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombres:         ['', Validators.required],
      apellidos:       ['', Validators.required],
      email:           ['', [Validators.required, Validators.email]],
      telefono:        ['', Validators.required],
      direccion:       ['', Validators.required],
      ciudad:          ['', Validators.required],
      fechaIngreso:    ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero:          ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.colaboradorService.getTiposDocumento().subscribe(data => {
      this.tiposDocumento = data;
      this.cd.detectChanges();
    });
  }

  /** Returns true if all fields in the current step are valid */
  isStepValid(): boolean {
    const fields = this.stepFields[this.currentStep] ?? [];
    return fields.every(f => this.form.get(f)?.valid);
  }

  nextStep(): void {
    // Touch all fields in current step to show validation messages
    const fields = this.stepFields[this.currentStep] ?? [];
    fields.forEach(f => this.form.get(f)?.markAsTouched());

    if (this.isStepValid() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  guardar(): void {
    if (this.form.valid) {
      this.loading = true;
      this.colaboradorService.addColaborador(this.form.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/listar']);
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}



