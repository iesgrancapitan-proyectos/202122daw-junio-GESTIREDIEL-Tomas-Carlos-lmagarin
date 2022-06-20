import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRobotComponent } from './error-robot.component';

describe('ErrorRobotComponent', () => {
  let component: ErrorRobotComponent;
  let fixture: ComponentFixture<ErrorRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRobotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
