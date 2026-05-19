import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsistente } from './registrar-asistente';

describe('RegistrarAsistente', () => {
  let component: RegistrarAsistente;
  let fixture: ComponentFixture<RegistrarAsistente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarAsistente],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarAsistente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
