import {
  Builder,
  Command,
  CommandOptions,
  Network,
  NetworkBuilder,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';

export enum PaymentComponents {
  VERIFICATION_KEY = 'payment-verification-key',
  VERIFICATION_KEY_FILE = 'payment-verification-key-file',
  SCRIPT_FILE = 'payment-script-file',
}

export class PaymentComponentBuilder {
  verificationKey(value: string): PaymentComponent {
    return PaymentComponent.verificationKey(value);
  }
  verificationKeyFile(value: string): PaymentComponent {
    return PaymentComponent.verificationKeyFile(value);
  }
  scriptFile(value: string): PaymentComponent {
    return PaymentComponent.scriptFile(value);
  }
}

export class PaymentComponent extends StringCommandParameter {
  constructor(paramKey: PaymentComponents, paramValue: string) {
    super(paramKey, paramValue);
  }

  static verificationKey(value: string): PaymentComponent {
    return new PaymentComponent(PaymentComponents.VERIFICATION_KEY, value);
  }
  static verificationKeyFile(value: string): PaymentComponent {
    return new PaymentComponent(PaymentComponents.VERIFICATION_KEY_FILE, value);
  }
  static scriptFile(value: string): PaymentComponent {
    return new PaymentComponent(PaymentComponents.SCRIPT_FILE, value);
  }
}

export enum StakeComponents {
  VERIFICATION_KEY = 'stake-verification-key',
  VERIFICATION_KEY_FILE = 'stake-verification-key-file',
  SCRIPT_FILE = 'script-file',
}

export class StakeComponentBuilder {
  verificationKey(value: string): StakeComponent {
    return StakeComponent.verificationKey(value);
  }
  verificationKeyFile(value: string): StakeComponent {
    return StakeComponent.verificationKeyFile(value);
  }
  scriptFile(value: string): StakeComponent {
    return StakeComponent.scriptFile(value);
  }
}

export class StakeComponent extends StringCommandParameter {
  constructor(paramKey: StakeComponents, paramValue: string) {
    super(paramKey, paramValue);
  }
  static verificationKey(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.VERIFICATION_KEY, value);
  }
  static verificationKeyFile(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.VERIFICATION_KEY_FILE, value);
  }
  static scriptFile(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.SCRIPT_FILE, value);
  }
}

export class BuildOptions implements CommandOptions {
  private paymentComponent?: PaymentComponent;
  private stakeComponent?: StakeComponent;
  private network?: Network;
  private outFile?: OutFile;

  withPaymentComponent(builder: Builder<PaymentComponentBuilder, PaymentComponent>): BuildOptions;
  withPaymentComponent(value: PaymentComponent): BuildOptions;
  withPaymentComponent(value: PaymentComponent | Builder<PaymentComponentBuilder, PaymentComponent>): BuildOptions {
    if (typeof value !== 'function') {
      this.paymentComponent = value;
      return this;
    }

    this.paymentComponent = value(new PaymentComponentBuilder());
    return this;
  }

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): BuildOptions;
  withStakeComponent(value: StakeComponent): BuildOptions;
  withStakeComponent(value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>): BuildOptions {
    if (typeof value !== 'function') {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withNetwork(builder: Builder<NetworkBuilder, Network>): BuildOptions;
  withNetwork(value: Network): BuildOptions;
  withNetwork(value: Network | Builder<NetworkBuilder, Network>): BuildOptions {
    if (typeof value !== 'function') {
      this.network = value;
      return this;
    }

    this.network = value(new NetworkBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): BuildOptions;
  withOutFile(value: OutFile): BuildOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): BuildOptions {
    if (typeof value !== 'function') {
      this.outFile = value;
      return this;
    }
    this.outFile = value(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.paymentComponent) {
      output.push(this.paymentComponent.toString());
    }
    if (this.stakeComponent) {
      output.push(this.stakeComponent.toString());
    }
    if (this.network) {
      output.push(this.network.toString());
    }
    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class Build extends Command<BuildOptions> {
  getCommandName(): string {
    return 'build';
  }
}
