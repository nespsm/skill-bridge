import { MaxCharLimit } from './max-char-limit';

describe('MaxCharLimit', () => {
  it('should create an instance', () => {
    const directive = new MaxCharLimit();
    expect(directive).toBeTruthy();
  });
});
