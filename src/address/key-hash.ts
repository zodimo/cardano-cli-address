import {
  Builder,
  Command,
  CommandOptions,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';

export enum PaymentVerificationKeyOptions {
  VALUE = 'payment-verification-key',
  FILE = 'payment-verification-key-file',
}

export class PaymentVerificationKeyFactory {
  value(value: string): PaymentVerificationKey {
    return PaymentVerificationKey.value(value);
  }
  file(value: string): PaymentVerificationKey {
    return PaymentVerificationKey.file(value);
  }
}
export class PaymentVerificationKey extends StringCommandParameter {
  constructor(paramKey: PaymentVerificationKeyOptions, paramValue: string) {
    super(paramKey, paramValue);
  }
  static value(value: string): PaymentVerificationKey {
    //--payment-verification-key STRING
    return new PaymentVerificationKey(PaymentVerificationKeyOptions.VALUE, value);
  }
  static file(value: string): PaymentVerificationKey {
    // --payment-verification-key-file FILE
    return new PaymentVerificationKey(PaymentVerificationKeyOptions.FILE, value);
  }
}

export class KeyHashOptions implements CommandOptions {
  private paymentVerificationKey?: PaymentVerificationKey;
  private outFile?: OutFile;

  withPaymentVerificationKey(builder: Builder<PaymentVerificationKeyFactory, PaymentVerificationKey>): KeyHashOptions;
  withPaymentVerificationKey(value: PaymentVerificationKey): KeyHashOptions;
  withPaymentVerificationKey(
    value: PaymentVerificationKey | Builder<PaymentVerificationKeyFactory, PaymentVerificationKey>,
  ): KeyHashOptions {
    if (value instanceof PaymentVerificationKey) {
      this.paymentVerificationKey = value;
      return this;
    }
    this.paymentVerificationKey = value(new PaymentVerificationKeyFactory());
    return this;
  }
  withOutFile(builder: Builder<OutFileBuilder, OutFile>): KeyHashOptions;
  withOutFile(value: OutFile): KeyHashOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): KeyHashOptions {
    if (value instanceof OutFile) {
      this.outFile = value;
      return this;
    }
    this.outFile = value(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.paymentVerificationKey) {
      output.push(this.paymentVerificationKey.toString());
    }
    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class KeyHash extends Command<KeyHashOptions> {
  getCommandName(): string {
    return 'key-hash';
  }
}
