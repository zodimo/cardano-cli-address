import {
  Builder,
  Command,
  CommandOptions,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';

export class InfoOptions implements CommandOptions {
  private address?: StringCommandParameter;
  private outFile?: OutFile;

  withAddress(value: string): InfoOptions {
    this.address = new StringCommandParameter('address', value);
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): InfoOptions;
  withOutFile(value: OutFile): InfoOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): InfoOptions {
    if (typeof value !== 'function') {
      this.outFile = value;
      return this;
    }
    this.outFile = value(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.address) {
      output.push(this.address.toString());
    }

    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class Info extends Command<InfoOptions> {
  getCommandName(): string {
    return 'info';
  }
}
