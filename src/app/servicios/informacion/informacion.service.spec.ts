import { TestBed } from '@angular/core/testing';

import { InformacionService } from './informacion.service';
import { TicketsService } from './tickets.service';
import { InventarioService } from './inventario.service';
import { EnlaceService } from './enlace.service';
import { UsuarioService } from './usuario.service';


describe('InformacionService', () => {
  let service: InformacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('InventarioService', () => {
  let service: InventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('EnlaceService', () => {
  let service: EnlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});