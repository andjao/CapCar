import { TestBed } from '@angular/core/testing';

import { PlateRequestService } from './plateRequest.service';

describe('PlateService', () => {
  let service: PlateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
