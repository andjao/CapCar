import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PlateRequestService } from './plateRequest.service';

describe('PlateService', () => {
  let service: PlateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	PlateRequestService
      ],
      imports: [
      	HttpClientModule
      ]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
