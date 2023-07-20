import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY, Public } from './public.decorator';

describe('Public Decorator', () => {
  it('should be defined', () => {
    expect(Public).toBeDefined();
  });

  it('should set metadata', () => {
    expect(Public()).toEqual(SetMetadata(IS_PUBLIC_KEY, true));
  });

  it('should be defined public key', () => {
    expect(IS_PUBLIC_KEY).toBeDefined();
  });
});
