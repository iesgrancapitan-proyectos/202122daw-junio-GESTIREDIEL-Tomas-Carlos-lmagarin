import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReparacionesComponent } from './lista-reparaciones.component';

describe('ListaReparacionesComponent', () => {
  let component: ListaReparacionesComponent;
  let fixture: ComponentFixture<ListaReparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReparacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
