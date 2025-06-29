import { TestBed } from '@angular/core/testing';

import { ObservableTest } from './observable-test';

describe('ObservableTest', () => {
  let service: ObservableTest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableTest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
