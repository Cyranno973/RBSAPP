import { TestBed } from '@angular/core/testing';

import { GoToMeetingService } from './go-to-meeting.service';

describe('GoToMeetingService', () => {
  let service: GoToMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoToMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
