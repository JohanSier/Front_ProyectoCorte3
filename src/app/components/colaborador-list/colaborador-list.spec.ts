import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorList } from './colaborador-list';

describe('ColaboradorList', () => {
  let component: ColaboradorList;
  let fixture: ComponentFixture<ColaboradorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradorList],
    }).compileComponents();

    fixture = TestBed.createComponent(ColaboradorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
