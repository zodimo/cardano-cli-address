import { BooleanCommandParameter, CompositeCommandParameter, NumericCommandParameter } from '../command-parameter';

export class NetworkBuilder {
  mainnet(): Network {
    return Network.mainnet();
  }

  testnetMagic(value: number): Network {
    return Network.testnetMagic(value);
  }
}

export class Network extends CompositeCommandParameter {
  static mainnet(): Network {
    const param = 'mainnet';
    return Network.from(BooleanCommandParameter.from(param));
  }

  static testnetMagic(value: number): Network {
    const param = 'testnet-magic';
    return Network.from(NumericCommandParameter.from(param, value));
  }
}
