import { Address } from '../../src/address';

describe('cardano-cli address build-script', () => {
  /*
Usage: cardano-cli address build-script --script-file FILE
          (--mainnet | --testnet-magic NATURAL)
          [--out-file FILE]
*/
  it('script-file, mainnet and outfile', () => {
    const scriptFile = 'my-script-file';
    const outfile = 'my-out-file';

    expect(
      Address.createWithCardanoCliBin()
        .buildScript((builder) =>
          builder
            .withScriptFile(scriptFile)
            .withNetwork((builder) => builder.mainnet())
            .withOutFile((builder) => builder.createForFile(outfile)),
        )
        .getCommand(),
    ).toBe(
      ['cardano-cli address build-script', `--script-file ${scriptFile}`, '--mainnet', `--out-file ${outfile}`].join(
        ' ',
      ),
    );
  });

  it('script-file and  mainnet', () => {
    const scriptFile = 'my-script-file';

    expect(
      Address.createWithCardanoCliBin()
        .buildScript((builder) => builder.withScriptFile(scriptFile).withNetwork((builder) => builder.mainnet()))
        .getCommand(),
    ).toBe(['cardano-cli address build-script', `--script-file ${scriptFile}`, '--mainnet'].join(' '));
  });

  it('script-file, testnet and outfile', () => {
    const scriptFile = 'my-script-file';
    const outfile = 'my-out-file';
    expect(
      Address.createWithCardanoCliBin()
        .buildScript((builder) =>
          builder
            .withScriptFile(scriptFile)
            .withNetwork((builder) => builder.testnetMagic(2))
            .withOutFile((builder) => builder.createForFile(outfile)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli address build-script',
        `--script-file ${scriptFile}`,
        '--testnet-magic 2',
        `--out-file ${outfile}`,
      ].join(' '),
    );
  });

  it('script-file and testnet ', () => {
    const scriptFile = 'my-script-file';

    expect(
      Address.createWithCardanoCliBin()
        .buildScript((builder) => builder.withScriptFile(scriptFile).withNetwork((builder) => builder.testnetMagic(2)))
        .getCommand(),
    ).toBe(['cardano-cli address build-script', `--script-file ${scriptFile}`, '--testnet-magic 2'].join(' '));
  });
});
