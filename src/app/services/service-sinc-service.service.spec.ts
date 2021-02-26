import { TestBed, inject } from '@angular/core/testing';

import { ServiceSincServiceService } from './service-sinc-service.service';

describe('ServiceSincServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceSincServiceService]
    });
  });

  it('should be created', inject([ServiceSincServiceService], (service: ServiceSincServiceService) => {
    expect(service).toBeTruthy();
  }));
});
