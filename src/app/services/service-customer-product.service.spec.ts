import { TestBed, inject } from '@angular/core/testing';

import { ServiceCustomerProductService } from './service-customer-product.service';

describe('ServiceCustomerProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceCustomerProductService]
    });
  });

  it('should be created', inject([ServiceCustomerProductService], (service: ServiceCustomerProductService) => {
    expect(service).toBeTruthy();
  }));
});
