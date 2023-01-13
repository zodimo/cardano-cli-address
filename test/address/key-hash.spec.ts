import { Address } from '../../src/address';
describe('cardano-cli address key-hash', () => {
  /*
Usage: cardano-cli address key-hash 
            ( --payment-verification-key STRING
            | --payment-verification-key-file FILE
            )
            [--out-file FILE]
    */
  it('payment-verification-key', () => {
    const paymentVerificationKey = 'my-special-key';
    expect(
      Address.createWithCardanoCliBin()
        .keyHash((builder) => {
          return builder.withPaymentVerificationKey((builder) => builder.value(paymentVerificationKey));
        })
        .getCommand(),
    ).toBe(['cardano-cli address key-hash', `--payment-verification-key ${paymentVerificationKey}`].join(' '));
  });

  it('payment-verification-key-file', () => {
    const paymentVerificationKeyFile = 'my-special-file';
    expect(
      Address.createWithCardanoCliBin()
        .keyHash((builder) => {
          return builder.withPaymentVerificationKey((builder) => builder.file(paymentVerificationKeyFile));
        })
        .getCommand(),
    ).toBe(['cardano-cli address key-hash', `--payment-verification-key-file ${paymentVerificationKeyFile}`].join(' '));
  });

  //outfile with one is the same on both so only testing one variation
  it('payment-verification-key-file with outfile', () => {
    const paymentVerificationKeyFile = 'my-special-file';
    const outFile = 'my-out-file';
    expect(
      Address.createWithCardanoCliBin()
        .keyHash((builder) => {
          return builder
            .withPaymentVerificationKey((builder) => builder.file(paymentVerificationKeyFile))
            .withOutFile((builder) => builder.createForFile(outFile));
        })
        .getCommand(),
    ).toBe(
      [
        'cardano-cli address key-hash',
        `--payment-verification-key-file ${paymentVerificationKeyFile}`,
        `--out-file ${outFile}`,
      ].join(' '),
    );
  });
});
