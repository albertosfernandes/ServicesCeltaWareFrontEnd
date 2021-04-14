import { TestBed, inject } from '@angular/core/testing';

import { ServiceDatabaseService } from './service-database.service';

describe('ServiceDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceDatabaseService]
    });
  });

  it('should be created', inject([ServiceDatabaseService], (service: ServiceDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
