import { TestBed, inject } from '@angular/core/testing';

import { ServiceConcentratorService } from './service-concentrator.service';

describe('ServiceConcentratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceConcentratorService]
    });
  });

  it('should be created', inject([ServiceConcentratorService], (service: ServiceConcentratorService) => {
    expect(service).toBeTruthy();
  }));
});
