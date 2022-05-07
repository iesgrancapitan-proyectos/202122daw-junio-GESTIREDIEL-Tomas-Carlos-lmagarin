import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClienteFormComponent } from './create-cliente-form.component';

describe('CreateClienteFormComponent', () => {
  let component: CreateClienteFormComponent;
  let fixture: ComponentFixture<CreateClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClienteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
