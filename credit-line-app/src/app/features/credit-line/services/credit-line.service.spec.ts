import { TestBed } from '@angular/core/testing';

import { CreditLineService } from './credit-line.service';

describe('CreditLineService', () => {
  let service: CreditLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
