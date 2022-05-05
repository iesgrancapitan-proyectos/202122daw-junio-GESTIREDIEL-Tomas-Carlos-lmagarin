import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloEditFormComponent } from './articulo-edit-form.component';

describe('ArticuloEditFormComponent', () => {
  let component: ArticuloEditFormComponent;
  let fixture: ComponentFixture<ArticuloEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
