import { BooleanCommandParameter, CompositeCommandParameter, MaybeCommandParameterFactory } from '../command-parameter';

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

export class NodeMode extends CompositeCommandParameter {
  static shelley(): NodeMode {
    return NodeMode.from(BooleanCommandParameter.from(NodeModes.SHELLY));
  }

  static byron(slotsPerEpoch?: number): NodeMode {
    const epochSlots = MaybeCommandParameterFactory.maybeNumeric('epoch-slots', slotsPerEpoch);
    return NodeMode.from(BooleanCommandParameter.from(NodeModes.BYRON), epochSlots);
  }

  static cardano(slotsPerEpoch?: number): NodeMode {
    const epochSlots = MaybeCommandParameterFactory.maybeNumeric('epoch-slots', slotsPerEpoch);
    return NodeMode.from(BooleanCommandParameter.from(NodeModes.CARDANO), epochSlots.toString());
  }
}
