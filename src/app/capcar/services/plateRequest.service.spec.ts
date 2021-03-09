import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequestsService } from '.';

describe('PlateService', () => {
  let service: RequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestsService
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
