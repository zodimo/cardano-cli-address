import { Address } from '../../src/address';

describe('cardano-cli address key-gen', () => {
  it('can create key-gen command with address', () => {
    /*
    Usage: cardano-cli address key-gen [--normal-key | --extended-key | --byron-key]
        --verification-key-file FILE
        --signing-key-file FILE
    */
    const verificationKeyFile = 'wallet.vkey';
    const signingKeyFile = 'wallet.skey';
    expect(
      Address.createWithCardanoCliBin()
        .keyGen((builder) => builder.withVerificationKeyFile(verificationKeyFile).withSigningKeyFile(signingKeyFile))
        .getCommand(),
    ).toBe(
      `cardano-cli address key-gen --verification-key-file ${verificationKeyFile} --signing-key-file ${signingKeyFile}`,
    );

    //create --extended-key as an example
    expect(
      Address.createWithCardanoCliBin()
        .keyGen((builder) =>
          builder
            .withKeyType((builder) => builder.extended())
            .withVerificationKeyFile(verificationKeyFile)
            .withSigningKeyFile(signingKeyFile),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli address key-gen',
        '--extended-key',
        `--verification-key-file ${verificationKeyFile}`,
        `--signing-key-file ${signingKeyFile}`,
      ].join(' '),
    );
  });
});
