import { TestBed } from '@angular/core/testing';

import { OverlaymanagerService } from './overlaymanager.service';

describe('OverlaymanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverlaymanagerService = TestBed.get(OverlaymanagerService);
    expect(service).toBeTruthy();
  });
});
