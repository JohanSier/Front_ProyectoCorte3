import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteList } from './docente-list';

describe('DocenteList', () => {
  let component: DocenteList;
  let fixture: ComponentFixture<DocenteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteList],
    }).compileComponents();

    fixture = TestBed.createComponent(DocenteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
