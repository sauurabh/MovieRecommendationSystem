import { TestBed } from '@angular/core/testing';

import { RecommedService } from './recommed.service';

describe('RecommedService', () => {
  let service: RecommedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
