import { Address } from '../../src/address';

describe('cardano-cli address build', () => {
  /*
Usage: cardano-cli address build 
            ( --payment-verification-key STRING
            | --payment-verification-key-file FILE
            | --payment-script-file FILE
            )
            [ --stake-verification-key STRING
            | --stake-verification-key-file FILE
            | --stake-script-file FILE
            ]
            (--mainnet | --testnet-magic NATURAL)
            [--out-file FILE]
*/
  it('payment component key , mainnet and outfile', () => {
    const key = 'my-key';
    const outfile = 'my-out-file';

    expect(
      Address.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withPaymentComponent((builder) => builder.verificationKey(key))
            .withNetwork((builder) => builder.mainnet())
            .withOutFile((builder) => builder.createForFile(outfile)),
        )
        .getCommand(),
    ).toBe(
      ['cardano-cli address build', `--payment-verification-key ${key}`, '--mainnet', `--out-file ${outfile}`].join(
        ' ',
      ),
    );
  });

  it('payment component file , testnet and outfile', () => {
    const file = 'my-file';
    const outfile = 'my-out-file';

    expect(
      Address.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withPaymentComponent((builder) => builder.verificationKeyFile(file))
            .withNetwork((builder) => builder.testnetMagic(2))
            .withOutFile((builder) => builder.createForFile(outfile)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli address build',
        `--payment-verification-key-file ${file}`,
        '--testnet-magic 2',
        `--out-file ${outfile}`,
      ].join(' '),
    );
  });

  it('payment component script file , testnet and outfile', () => {
    const file = 'my-script-file';
    const outfile = 'my-out-file';

    expect(
      Address.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withPaymentComponent((builder) => builder.scriptFile(file))
            .withNetwork((builder) => builder.testnetMagic(2))
            .withOutFile((builder) => builder.createForFile(outfile)),
        )
        .getCommand(),
    ).toBe(
      ['cardano-cli address build', `--payment-script-file ${file}`, '--testnet-magic 2', `--out-file ${outfile}`].join(
        ' ',
      ),
    );
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
