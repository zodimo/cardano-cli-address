import assert from 'assert';
import { notNullish } from '../helper';
import { CommandParameter } from '../command-parameter';

export enum NodeModes {
  SHELLY = 'shelley-mode',
  BYRON = 'byron-mode',
  CARDANO = 'cardano-mode',
}
export class NodeModeBuilder {
  shelley(): NodeMode {
    return NodeMode.shelley();
  }
  byron(slotsPerEpoch?: number): NodeMode {
    return NodeMode.byron(slotsPerEpoch);
  }
  cardano(slotsPerEpoch?: number): NodeMode {
    return NodeMode.cardano(slotsPerEpoch);
  }
}

export class NodeMode extends CommandParameter {
  constructor(paramKey: NodeModes, paramValue?: string) {
    super(paramKey, paramValue);
  }
  static shelley(): NodeMode {
    return new NodeMode(NodeModes.SHELLY);
  }

  static byron(slotsPerEpoch?: number): NodeMode {
    if (notNullish(slotsPerEpoch)) {
      assert(typeof slotsPerEpoch === 'number');
      const epochSlots = new CommandParameter('epoch-slots', slotsPerEpoch.toString());
      return new NodeMode(NodeModes.BYRON, epochSlots.toString());
    }
    return new NodeMode(NodeModes.BYRON);
  }

  static cardano(slotsPerEpoch?: number): NodeMode {
    if (notNullish(slotsPerEpoch)) {
      assert(typeof slotsPerEpoch === 'number');
      const epochSlots = new CommandParameter('epoch-slots', slotsPerEpoch.toString());
      return new NodeMode(NodeModes.CARDANO, epochSlots.toString());
    }
    return new NodeMode(NodeModes.CARDANO);
  }
}
