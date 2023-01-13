import assert from 'assert';

export class CommandParameter {
  constructor(private paramKey: string, private paramValue?: string) {}
  private hasParamValue(): boolean {
    return this.paramValue !== null && this.paramValue !== undefined;
  }
  toString(): string {
    const outputs: string[] = [`--${this.paramKey}`];
    if (this.hasParamValue()) {
      //to help infer type for typescript
      assert(typeof this.paramValue === 'string');
      outputs.push(this.paramValue);
    }
    return outputs.join(' ');
  }
}
