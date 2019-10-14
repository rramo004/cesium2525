import { TestBed } from '@angular/core/testing';

import { ConditionalsService } from './conditionalservice.service';

describe('ConditionalserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConditionalsService = TestBed.get(ConditionalsService);
    expect(service).toBeTruthy();
  });
});
