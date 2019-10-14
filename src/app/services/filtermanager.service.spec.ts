import { TestBed } from '@angular/core/testing';

import { FiltermanagerService } from './filtermanager.service';

describe('FiltermanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltermanagerService = TestBed.get(FiltermanagerService);
    expect(service).toBeTruthy();
  });
});
