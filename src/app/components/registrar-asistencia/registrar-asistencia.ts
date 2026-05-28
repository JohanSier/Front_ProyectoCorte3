import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CatalogosService } from '../../services/catalogos-service';
import { AsistenteService } from '../../services/asistente-service';
import { Loading } from '../loading/loading';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
  usuarios: any[] = [];
  usuariosBase: any[] = [];

  //Forms de info
  registrarAsistencia!: FormGroup;

  //Variables uso general
  load: boolean = false;
  mensaje = "";
  mostrarDropdown = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogosService: CatalogosService,
    private asistenteService: AsistenteService
  /*private userService: UserService*/) { }

  ngOnInit() {
    this.inicializarForm();
    this.initList();
    this.setTodayDate();
    this.findUsers();

    this.registrarAsistencia.get('asistenteId')?.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(value => {

          const v = value?.toString().toLowerCase() || '';

          if (!v || v.length < 2) {
            return of([]);
          }

          const filtrados = this.usuariosBase.filter(u =>
            u.nombre.toLowerCase().includes(v) ||
            String(u.asistenteId).includes(v)
          );

          return of(filtrados);
        })
      )
      .subscribe(res => {
        this.usuarios = res;
        this.mostrarDropdown = true;
      });
  }

  inicializarForm() {
    this.registrarAsistencia = this.fb.group({

      asistenteId: ['', [Validators.required, Validators.maxLength(20)]],
      fecha: [{ value: '', disabled: true }, [Validators.required]],
      tipo_servicio: [{ value: '', disabled: true }, [Validators.required]],
      usuariocrea: [{ value: 'ADMIN', disabled: true }, [Validators.required]],
      estado: [{ value: '', disabled: true }, [Validators.required]],
      observaciones: [{ value: '', disabled: true }, [Validators.maxLength(30)]],
      fecha_creacion: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  initList() {
    this.tiposServicio = this.catalogosService.getTiposServicio();
    this.estadosUsuario = this.catalogosService.getEstadosUsuario();
  }

  findUsers() {
    this.usuariosBase = this.catalogosService.getUsuarios();
  }

  setUser() {
    this.registrarAsistencia.enable();
    this.disabledfields();
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

  disabledfields() {
    this.registrarAsistencia.get("fecha")?.disable();
    this.registrarAsistencia.get("usuariocrea")?.disable();
    this.registrarAsistencia.get("estado")?.disable();
  }

  setUsuarioCrea() {
    this.registrarAsistencia.get("estado")?.setValue("1");
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
          console.log(this.registrarAsistencia.getRawValue());
          this.ngOnInit();
        }
      );
    } else {
      //this.registrarAsistencia.markAllAsTouched();
      console.log(this.registrarAsistencia.getRawValue());
      this.ngOnInit();
    }
  }

  seleccionar(item: any) {
    this.registrarAsistencia.get('asistenteId')?.setValue(
      item.asistenteId,
      { emitEvent: false }
    );

    this.usuarios = [];
    this.mostrarDropdown = false;
    this.setUser();
    //set info
  }

  @HostListener('document:keydown.enter')
  selectFirst() {
    if (this.usuarios.length) {
      this.seleccionar(this.usuarios[0]);
    }
  }

}
