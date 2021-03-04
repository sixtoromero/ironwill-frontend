import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEjerciciosComponent } from './tipos-ejercicios.component';

describe('TiposEjerciciosComponent', () => {
  let component: TiposEjerciciosComponent;
  let fixture: ComponentFixture<TiposEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposEjerciciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
