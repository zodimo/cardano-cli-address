import { Command } from '../command';
import { BooleanCommandParameter, StringCommandParameter } from '../command-parameter';
import { CommandOptions } from '../command-options';
import { Builder } from '../builder';

export enum KeyTypes {
  NORMAL = 'normal-key',
  EXTENDED = 'extended-key',
  BYRON = 'byron-key',
}

export class KeyTypeBuilder {
  normal(): KeyType {
    return KeyType.normal();
  }
  extended(): KeyType {
    return KeyType.extended();
  }
  byron(): KeyType {
    return KeyType.byron();
  }
}

export class KeyType extends BooleanCommandParameter {
  constructor(paramKey: KeyTypes) {
    super(paramKey);
  }

  static normal(): KeyType {
    return new KeyType(KeyTypes.NORMAL);
  }
  static extended(): KeyType {
    return new KeyType(KeyTypes.EXTENDED);
  }
  static byron(): KeyType {
    return new KeyType(KeyTypes.BYRON);
  }
}

export class KeyGenOptions implements CommandOptions {
  private keyType?: KeyType;
  private verificationKeyFile?: StringCommandParameter;
  private signingKeyFile?: StringCommandParameter;

  withKeyType(builder: Builder<KeyTypeBuilder, KeyType>): KeyGenOptions;
  withKeyType(value: KeyType): KeyGenOptions;
  withKeyType(value: KeyType | Builder<KeyTypeBuilder, KeyType>): KeyGenOptions {
    if (value instanceof KeyType) {
      this.keyType = value;
      return this;
    } else {
      this.keyType = value(new KeyTypeBuilder());
      return this;
    }
  }
  withVerificationKeyFile(verificationKeyFile: string): KeyGenOptions {
    this.verificationKeyFile = new StringCommandParameter('verification-key-file', verificationKeyFile);
    return this;
  }
  withSigningKeyFile(signingKeyFile: string): KeyGenOptions {
    this.signingKeyFile = new StringCommandParameter('signing-key-file', signingKeyFile);
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.keyType) {
      output.push(this.keyType.toString());
    }
    if (this.verificationKeyFile) {
      output.push(this.verificationKeyFile.toString());
    }
    if (this.signingKeyFile) {
      output.push(this.signingKeyFile.toString());
    }

    return output.join(' ');
  }
}

export class KeyGen extends Command<KeyGenOptions> {
  getCommandName(): string {
    return 'key-gen';
  }
}
