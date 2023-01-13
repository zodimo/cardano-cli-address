import { CommandParameter } from '../command-parameter';

export class NetworkBuilder {
  mainnet(): Network {
    return Network.mainnet();
  }

  testnetMagic(value: number): Network {
    return Network.testnetMagic(value);
  }
}

export class Network extends CommandParameter {
  static mainnet(): Network {
    const param = 'mainnet';
    return new Network(param);
  }

  static testnetMagic(value: number): Network {
    const param = 'testnet-magic';
    return new Network(param, value.toString());
  }
}
