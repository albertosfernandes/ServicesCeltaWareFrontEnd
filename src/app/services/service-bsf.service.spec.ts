import { TestBed, inject } from '@angular/core/testing';

import { ServiceBsfService } from './service-bsf.service';

describe('ServiceBsfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceBsfService]
    });
  });

  it('should be created', inject([ServiceBsfService], (service: ServiceBsfService) => {
    expect(service).toBeTruthy();
  }));
});
