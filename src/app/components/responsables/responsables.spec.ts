import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { Responsables } from './responsables';
import { ResponsablesService } from '../../services/responsables';
import { provideHttpClient } from '@angular/common/http';

describe('Responsables Component', () => {
  let component: Responsables;
  let fixture: ComponentFixture<Responsables>;
  let mockService: jasmine.SpyObj<ResponsablesService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ResponsablesService', ['create', 'getAll']);

    await TestBed.configureTestingModule({
      imports: [Responsables, ReactiveFormsModule, CommonModule],
      providers: [
        provideHttpClient(),
        { provide: ResponsablesService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Responsables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── CRITERIO: Identificación no vacía ──────────────────────────────────

  it('debe marcar identificacion como inválido si está vacío', () => {
    component.form.get('identificacion')?.setValue('');
    expect(component.form.get('identificacion')?.valid).toBeFalse();
  });

  it('debe marcar identificacion como válido si tiene valor', () => {
    component.form.get('identificacion')?.setValue('123456789');
    expect(component.form.get('identificacion')?.valid).toBeTrue();
  });

  // ── CRITERIO: Nombre completo no vacío ──────────────────────────────────

  it('debe marcar nombreCompleto como inválido si está vacío', () => {
    component.form.get('nombreCompleto')?.setValue('');
    expect(component.form.get('nombreCompleto')?.valid).toBeFalse();
  });

  it('debe marcar nombreCompleto como válido si tiene valor', () => {
    component.form.get('nombreCompleto')?.setValue('María García');
    expect(component.form.get('nombreCompleto')?.valid).toBeTrue();
  });

  // ── CRITERIO: Checklist — un niño inicial ──────────────────────────────

  it('debe iniciar con un solo campo de niño', () => {
    expect(component.nombresNinos.length).toBe(1);
  });

  // ── CRITERIO: Checklist marcado — agregar niño ─────────────────────────

  it('debe agregar un campo de niño al llamar agregarNino()', () => {
    component.agregarNino();
    expect(component.nombresNinos.length).toBe(2);
  });

  // ── CRITERIO: Checklist — eliminar niño ────────────────────────────────

  it('debe eliminar un campo de niño al llamar eliminarNino()', () => {
    component.agregarNino();
    component.eliminarNino(1);
    expect(component.nombresNinos.length).toBe(1);
  });

  it('no debe eliminar el último campo de niño', () => {
    component.eliminarNino(0);
    expect(component.nombresNinos.length).toBe(1);
  });

  // ── CRITERIO: No guardar si formulario inválido ─────────────────────────

  it('no debe llamar al servicio si el formulario es inválido', () => {
    component.guardar();
    expect(mockService.create).not.toHaveBeenCalled();
  });

  // ── CRITERIO: Registro exitoso ──────────────────────────────────────────

  it('debe llamar al servicio y limpiar el formulario al guardar exitosamente', () => {
    mockService.create.and.returnValue(of({} as any));

    component.form.get('identificacion')?.setValue('123456789');
    component.form.get('nombreCompleto')?.setValue('María García');
    component.nombresNinos.at(0).setValue('Juan García');

    component.guardar();

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(component.form.get('identificacion')?.value).toBeFalsy();
  });

  // ── CRITERIO: Niño ya registrado — error 409 ───────────────────────────

  it('debe mostrar mensaje de niño ya registrado si error 409', () => {
    spyOn(window, 'alert');
    mockService.create.and.returnValue(throwError(() => ({ status: 409 })));

    component.form.get('identificacion')?.setValue('123456789');
    component.form.get('nombreCompleto')?.setValue('María García');
    component.nombresNinos.at(0).setValue('Juan García');

    component.guardar();

    expect(window.alert).toHaveBeenCalledWith('Un niño ya está registrado con otro responsable');
  });

  // ── CRITERIO: Error general al registrar ───────────────────────────────

  it('debe mostrar mensaje de error general si falla el servicio', () => {
    spyOn(window, 'alert');
    mockService.create.and.returnValue(throwError(() => ({ status: 500 })));

    component.form.get('identificacion')?.setValue('123456789');
    component.form.get('nombreCompleto')?.setValue('María García');
    component.nombresNinos.at(0).setValue('Juan García');

    component.guardar();

    expect(window.alert).toHaveBeenCalledWith('Error al registrar');
  });

  // ── CRITERIO: Limpiar formulario ───────────────────────────────────────

  it('debe limpiar el formulario al llamar limpiar()', () => {
    component.form.get('identificacion')?.setValue('123456789');
    component.form.get('nombreCompleto')?.setValue('María García');
    component.agregarNino();

    component.limpiar();

    expect(component.form.get('identificacion')?.value).toBeFalsy();
    expect(component.nombresNinos.length).toBe(1);
  });
});
