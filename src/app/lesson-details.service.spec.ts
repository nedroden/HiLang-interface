import { TestBed, inject } from '@angular/core/testing';

import { LessonDetailsService } from './lesson-details.service';

describe('LessonDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonDetailsService]
    });
  });

  it('should be created', inject([LessonDetailsService], (service: LessonDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
