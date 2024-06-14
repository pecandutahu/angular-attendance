import { TestBed } from '@angular/core/testing';

import { PresenceTypeServicesService } from '../../core/services/presence-type-services.service';

describe('PresenceTypeServicesService', () => {
  let service: PresenceTypeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresenceTypeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
