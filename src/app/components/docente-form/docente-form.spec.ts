import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteForm } from './docente-form';

describe('DocenteForm', () => {
  let component: DocenteForm;
  let fixture: ComponentFixture<DocenteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DocenteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
