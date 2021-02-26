import { TestBed, inject } from '@angular/core/testing';

import { ServiceSincwebService } from './service-sincweb.service';

describe('ServiceSincwebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceSincwebService]
    });
  });

  it('should be created', inject([ServiceSincwebService], (service: ServiceSincwebService) => {
    expect(service).toBeTruthy();
  }));
});
