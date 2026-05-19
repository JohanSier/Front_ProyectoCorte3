import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fechaPasadaValidator(
  control: AbstractControl
): ValidationErrors | null {

  if (!control.value) {
    return null;
  }

  const fecha = new Date(control.value);
  const hoy = new Date();

  hoy.setHours(0,0,0,0);
  fecha.setHours(0,0,0,0);

  return fecha > hoy
    ? { fechaFutura: true }
    : null;
}