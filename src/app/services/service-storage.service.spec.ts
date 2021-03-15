import { TestBed, inject } from '@angular/core/testing';

import { ServiceStorageService } from './service-storage.service';

describe('ServiceStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceStorageService]
    });
  });

  it('should be created', inject([ServiceStorageService], (service: ServiceStorageService) => {
    expect(service).toBeTruthy();
  }));
});
