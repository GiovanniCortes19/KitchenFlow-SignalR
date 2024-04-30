import { TestBed } from '@angular/core/testing';

import { RealTimeClientService } from './real-time-client.service';

describe('RealTimeClientService', () => {
  let service: RealTimeClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
