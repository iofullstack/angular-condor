import { TestBed, inject } from '@angular/core/testing';
import { WrappedSocket } from './socket-io.service';

describe('WrappedSocket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WrappedSocket]
    });
  });

  it('should be created', inject([WrappedSocket], (service: WrappedSocket) => {
    expect(service).toBeTruthy();
  }));
});
