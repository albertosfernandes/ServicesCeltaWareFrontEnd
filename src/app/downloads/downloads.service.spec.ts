import { TestBed, inject } from '@angular/core/testing';

import { Downloads\downloadsService } from './downloads\downloads.service';

describe('Downloads\downloadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Downloads\downloadsService]
    });
  });

  it('should be created', inject([Downloads\downloadsService], (service: Downloads\downloadsService) => {
    expect(service).toBeTruthy();
  }));
});
