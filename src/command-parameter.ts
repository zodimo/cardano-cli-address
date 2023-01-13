import assert from 'assert';

export interface CommandParameter {
  toString(): string;
}
export class StringCommandParameter implements CommandParameter {
  constructor(private paramKey: string, private paramValue: string, private shouldQuoteValue?: boolean) {}

  static from(paramKey: string, paramValue: string, shouldQuoteValue?: boolean) {
    return new StringCommandParameter(paramKey, paramValue, shouldQuoteValue);
  }

  toString(): string {
    const outputs: string[] = [`--${this.paramKey}`];
    assert(
      typeof this.paramValue === 'string',
      `Expecting --${this.paramKey} to be a string, got ${typeof this.paramValue}`,
    );

    if (this.shouldQuoteValue) {
      outputs.push(`'${this.paramValue}'`);
    } else {
      outputs.push(this.paramValue);
    }

    return outputs.join(' ');
  }
}

export class NumericCommandParameter implements CommandParameter {
  constructor(private paramKey: string, private paramValue: number) {}

  static from(paramKey: string, paramValue: number) {
    return new NumericCommandParameter(paramKey, paramValue);
  }

  toString(): string {
    const outputs: string[] = [`--${this.paramKey}`];
    assert(
      typeof this.paramValue === 'number',
      `Expecting --${this.paramKey} to be a number, got ${typeof this.paramValue}`,
    );
    outputs.push(this.paramValue.toString());
    return outputs.join(' ');
  }
}

export class BooleanCommandParameter implements CommandParameter {
  constructor(private paramKey: string) {}

  static from(paramKey: string) {
    return new BooleanCommandParameter(paramKey);
  }

  toString(): string {
    return `--${this.paramKey}`;
  }
}

export class CompositeCommandParameter implements CommandParameter {
  private params: CommandParameter[];
  constructor(...params: CommandParameter[]) {
    this.params = params;
  }

  static from(...params: CommandParameter[]) {
    return new CompositeCommandParameter(...params);
  }

  toString(): string {
    //filter out NothingCommandParameters
    const filteredParams = this.params.filter((param) => !(param instanceof NothingCommandParameter));
    return filteredParams.map((param) => param.toString()).join(' ');
  }
}
export class NothingCommandParameter implements CommandParameter {
  toString(): string {
    return '';
  }
}

export class MaybeCommandParameterFactory {
  static maybeString(
    paramKey: string,
    paramValue?: string,
    shouldQuoteValue?: boolean,
  ): StringCommandParameter | NothingCommandParameter {
    if (paramValue) {
      StringCommandParameter.from(paramKey, paramValue, shouldQuoteValue);
    }
    return new NothingCommandParameter();
  }

  static maybeNumeric(paramKey: string, paramValue?: number): NumericCommandParameter | NothingCommandParameter {
    if (paramValue !== null && paramValue !== undefined) {
      return NumericCommandParameter.from(paramKey, paramValue);
    }

    return new NothingCommandParameter();
  }
}
