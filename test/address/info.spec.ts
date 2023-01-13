import { Address } from '../../src/address';

describe('cardano-cli address info', () => {
  /*
  Usage: cardano-cli address info --address ADDRESS [--out-file FILE]
*/
  it('address', () => {
    const address = 'my-address';

    expect(
      Address.createWithCardanoCliBin()
        .info((builder) => builder.withAddress(address))
        .getCommand(),
    ).toBe(`cardano-cli address info --address ${address}`);
  });

  it('address and outfile', () => {
    const address = 'my-address';
    const outFilename = 'my-out-file';

    expect(
      Address.createWithCardanoCliBin()
        .info((builder) => builder.withAddress(address).withOutFile((builder) => builder.createForFile(outFilename)))
        .getCommand(),
    ).toBe(`cardano-cli address info --address ${address} --out-file ${outFilename}`);
  });
});
