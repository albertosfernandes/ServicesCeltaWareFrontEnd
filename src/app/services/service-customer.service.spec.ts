import { TestBed, inject } from '@angular/core/testing';

import { ServiceCustomerService } from './service-customer.service';

describe('ServiceCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceCustomerService]
    });
  });

  it('should be created', inject([ServiceCustomerService], (service: ServiceCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
