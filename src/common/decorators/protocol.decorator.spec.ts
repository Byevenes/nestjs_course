import { Protocol } from './protocol.decorator';

describe('Protocol Decorator', () => {
  it('should be defined', () => {
    expect(Protocol).toBeDefined();
  });
  it('should return a function', () => {
    expect(typeof Protocol('http')).toBe('function');
  });
});
