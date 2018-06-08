import { TestBed, inject } from '@angular/core/testing';

import { HilangApiService } from './hilang-api.service';

describe('HilangApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HilangApiService]
    });
  });

  it('should be created', inject([HilangApiService], (service: HilangApiService) => {
    expect(service).toBeTruthy();
  }));
});
