import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {DocenteService} from '../../services/docente-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-docente-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Importante
  templateUrl: './docente-form.html'
})
export class DocenteForm {
  form: FormGroup;

  constructor(private fb: FormBuilder, private docenteService: DocenteService,
              private router: Router) {
    this.form = this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],

    });
  }

  guardar() {
    if (this.form.valid) {
      this.docenteService.addDocente(this.form.value).subscribe({
        next: () => {
          alert('¡Docente creado!');
          this.router.navigate(['/listar']);
        }
      });
    }
  }
}
