import { TestBed } from '@angular/core/testing';

import { MilsymService } from './milsym.service';

describe('MilsymService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MilsymService = TestBed.get(MilsymService);
    expect(service).toBeTruthy();
  });
});
