import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReparacionFormComponent } from './create-reparacion-form.component';

describe('CreateReparacionFormComponent', () => {
  let component: CreateReparacionFormComponent;
  let fixture: ComponentFixture<CreateReparacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReparacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReparacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
