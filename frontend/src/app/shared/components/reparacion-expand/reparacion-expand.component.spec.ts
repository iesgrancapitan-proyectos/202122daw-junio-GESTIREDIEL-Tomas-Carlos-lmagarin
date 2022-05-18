import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionExpandComponent } from './reparacion-expand.component';

describe('ReparacionExpandComponent', () => {
  let component: ReparacionExpandComponent;
  let fixture: ComponentFixture<ReparacionExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparacionExpandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparacionExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
