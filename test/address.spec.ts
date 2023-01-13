import { Address } from '../src/address';

describe('cardano-cli address', () => {
  /*
  Usage: cardano-cli address (key-gen | key-hash | build | build-script | info)
  */
  it('default commandPrefix', () => {
    expect(Address.createWithCardanoCliBin().commandPrefix).toBe('cardano-cli address');
  });

  it('can change cliBinPath commandPrefix', () => {
    expect(Address.createWithCardanoCliBin('cli').commandPrefix).toBe('cli address');
  });
});
