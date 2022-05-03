import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoCardComponent } from './tecnico-card.component';

describe('TecnicoCardComponent', () => {
  let component: TecnicoCardComponent;
  let fixture: ComponentFixture<TecnicoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
