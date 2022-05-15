import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispositivoFormComponent } from './create-dispositivo-form.component';

describe('CreateDispositivoFormComponent', () => {
  let component: CreateDispositivoFormComponent;
  let fixture: ComponentFixture<CreateDispositivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDispositivoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispositivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
