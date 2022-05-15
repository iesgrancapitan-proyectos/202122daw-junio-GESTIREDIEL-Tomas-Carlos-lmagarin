import { TestBed } from '@angular/core/testing';

import { ReparacionesService } from './reparaciones.service';

describe('ReparacionesService', () => {
  let service: ReparacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
