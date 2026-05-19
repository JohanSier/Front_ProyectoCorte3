import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CatalogosService } from '../../services/catalogos-service';
import { AsistenteService } from '../../services/asistente-service';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Loading],
  templateUrl: './registrar-asistencia.html',
  styleUrl: './registrar-asistencia.scss',
})
export class RegistrarAsistencia implements OnInit {

  //Variables List
  tiposServicio: any[] = [];
  estadosUsuario: any[] = [];

  //Forms de info
  registrarAsistencia!: FormGroup;

  //Variables uso general
  load: boolean = false;
  mensaje = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogosService: CatalogosService,
    private asistenteService: AsistenteService
  /*private userService: UserService*/) { }

  ngOnInit() {
    this.inicializarForm();
    this.initList();
  }

  inicializarForm() {
    this.registrarAsistencia = this.fb.group({

      asistenteId: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
      fecha: [{ value: '', disabled: true }, [Validators.required]],
      tipo_servicio: [{ value: '', disabled: true }, [Validators.required]],
      usuariocrea: [{ value: 'ADMIN', disabled: true }, [Validators.required]],
      estado: [{ value: '', disabled: true }, [Validators.required]],
      observaciones: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]],
      fecha_creacion: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  initList() {
    this.tiposServicio = this.catalogosService.getTiposServicio();
    this.estadosUsuario = this.catalogosService.getEstadosUsuario();
  }

  findUser() {
    this.registrarAsistencia.enable();
    this.setTodayDate();
    this.setUsuarioCrea();
  }

  setTodayDate() {
    this.registrarAsistencia.patchValue({
      fecha: new Date().toISOString().split('T')[0]
    });
    this.registrarAsistencia.patchValue({
      fecha_creacion: new Date().toISOString().split('T')[0]
    });
    this.registrarAsistencia.get("fecha")?.disable();
  }

  setUsuarioCrea() {
    this.registrarAsistencia.get("usuariocrea")?.disable();
  }

  sendRegister() {
    if (this.registrarAsistencia.valid) {
      this.load = true;
      this.asistenteService.register(this.registrarAsistencia.getRawValue()).subscribe(
        data => {
          let resSTR = JSON.stringify(data);
          let resJSON = JSON.parse(resSTR);
          this.mensaje = resJSON.mensaje;
          this.load = false;
        },
        error => {
          this.load = false;
          this.mensaje = "Error en el registro porfavor intente nuevamente";
          console.log("error", error);
        }
      );
    } else {
      this.registrarAsistencia.markAllAsTouched();
      console.log(this.registrarAsistencia.getRawValue());
      return;
    }
  }



}
