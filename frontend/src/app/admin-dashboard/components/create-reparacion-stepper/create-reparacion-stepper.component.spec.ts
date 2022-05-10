import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReparacionStepperComponent } from './create-reparacion-stepper.component';

describe('CreateReparacionStepperComponent', () => {
  let component: CreateReparacionStepperComponent;
  let fixture: ComponentFixture<CreateReparacionStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReparacionStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReparacionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
