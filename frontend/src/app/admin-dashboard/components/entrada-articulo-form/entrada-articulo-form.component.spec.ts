import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaArticuloFormComponent } from './entrada-articulo-form.component';

describe('EntradaArticuloFormComponent', () => {
  let component: EntradaArticuloFormComponent;
  let fixture: ComponentFixture<EntradaArticuloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaArticuloFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaArticuloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
