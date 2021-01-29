import { TestBed, inject } from '@angular/core/testing';

import { ServiceSigSatService } from './service-sig-sat.service';

describe('ServiceSigSatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceSigSatService]
    });
  });

  it('should be created', inject([ServiceSigSatService], (service: ServiceSigSatService) => {
    expect(service).toBeTruthy();
  }));
});
