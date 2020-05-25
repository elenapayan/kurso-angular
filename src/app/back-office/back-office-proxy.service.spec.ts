import { TestBed } from '@angular/core/testing';

import { BackOfficeProxyService } from './back-office-proxy.service';

describe('BackOfficeProxyService', () => {
  let service: BackOfficeProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackOfficeProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
