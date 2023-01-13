import { BooleanCommandParameter } from '../command-parameter';

export enum Eras {
  BYRON = 'byron-era',
  SHELLY = 'shelly-era',
  ALLEGRA = 'allegra-era',
  MARY = 'mary-era',
  ALONZO = 'alonzo-era',
  BABBAGE = 'babbage-era',
}

export class EraBuilder {
  get byron(): Era {
    return Era.byron;
  }
  get shelly(): Era {
    return Era.shelly;
  }
  get allegra(): Era {
    return Era.allegra;
  }
  get mary(): Era {
    return Era.mary;
  }
  get alonzo(): Era {
    return Era.alonzo;
  }
  get babbage(): Era {
    return Era.babbage;
  }
}

export class Era extends BooleanCommandParameter {
  constructor(paramKey: Eras) {
    super(paramKey);
  }
  static get byron(): Era {
    return new Era(Eras.BYRON);
  }

  static get shelly(): Era {
    return new Era(Eras.SHELLY);
  }

  static get allegra(): Era {
    return new Era(Eras.ALLEGRA);
  }

  static get mary(): Era {
    return new Era(Eras.MARY);
  }

  static get alonzo(): Era {
    return new Era(Eras.ALONZO);
  }
  static get babbage(): Era {
    return new Era(Eras.BABBAGE);
  }
}
