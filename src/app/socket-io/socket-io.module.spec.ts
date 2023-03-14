import { SocketIoModule } from './socket-io.module';

describe('SocketIoModule', () => {
  let socketIoModule: SocketIoModule;

  beforeEach(() => {
    socketIoModule = new SocketIoModule();
  });

  it('should create an instance', () => {
    expect(socketIoModule).toBeTruthy();
  });
});
