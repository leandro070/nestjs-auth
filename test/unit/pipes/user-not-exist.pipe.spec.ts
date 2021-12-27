import { UserNotExistPipe } from 'src/pipes/user-not-exist.pipe';

describe('UserNotExistPipe', () => {
  it('should be defined', () => {
    expect(new UserNotExistPipe(null)).toBeDefined();
  });
});
