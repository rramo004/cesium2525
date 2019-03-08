import { TestBed } from '@angular/core/testing';

import { XmljsonserviceService } from './xmljsonservice.service';

describe('XmljsonserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmljsonserviceService = TestBed.get(XmljsonserviceService);
    expect(service).toBeTruthy();
  });
});
