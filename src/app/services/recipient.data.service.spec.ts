import { TestBed } from '@angular/core/testing';

import { RecipientDataService } from './recipient.data.service';

describe('RecipientService', () => {
  let service: RecipientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
