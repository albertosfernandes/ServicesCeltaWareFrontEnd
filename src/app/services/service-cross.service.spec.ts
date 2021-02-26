import { TestBed, inject } from '@angular/core/testing';

import { ServiceCrossService } from './service-cross.service';

describe('ServiceCrossService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceCrossService]
    });
  });

  it('should be created', inject([ServiceCrossService], (service: ServiceCrossService) => {
    expect(service).toBeTruthy();
  }));
});
