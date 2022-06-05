import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionClienteComponent } from './reparacion-cliente.component';

describe('ReparacionClienteComponent', () => {
  let component: ReparacionClienteComponent;
  let fixture: ComponentFixture<ReparacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparacionClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
