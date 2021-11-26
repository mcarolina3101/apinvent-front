import { TestBed } from '@angular/core/testing';

import { InformacionService } from './informacion.service';

describe('AutenticacionService', () => {
  let service: InformacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});