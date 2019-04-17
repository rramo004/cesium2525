import { TestBed } from '@angular/core/testing';

import { TrackmanagerService } from './trackmanager.service';

describe('TrackmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackmanagerService = TestBed.get(TrackmanagerService);
    expect(service).toBeTruthy();
  });
});
