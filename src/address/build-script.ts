import { Builder } from '../builder';
import { CommandOptions } from '../command-options';
import { CommandParameter } from '../command-parameter';
import { Command } from '../command';
import { Network, NetworkBuilder } from '../common/network';
import { OutFile, OutFileBuilder } from '../common/out-file';

export class BuildScriptOptions implements CommandOptions {
  private scriptFile?: CommandParameter;
  private network?: Network;
  private outFile?: OutFile;

  withScriptFile(value: string): BuildScriptOptions {
    this.scriptFile = new CommandParameter('script-file', value);
    return this;
  }

  withNetwork(builder: Builder<NetworkBuilder, Network>): BuildScriptOptions;
  withNetwork(value: Network): BuildScriptOptions;
  withNetwork(value: Network | Builder<NetworkBuilder, Network>): BuildScriptOptions {
    if (value instanceof Network) {
      this.network = value;
      return this;
    }

    this.network = value(new NetworkBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): BuildScriptOptions;
  withOutFile(value: OutFile): BuildScriptOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): BuildScriptOptions {
    if (value instanceof OutFile) {
      this.outFile = value;
      return this;
    }
    this.outFile = value(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.scriptFile) {
      output.push(this.scriptFile.toString());
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
export class BuildScript extends Command<BuildScriptOptions> {
  getCommandName(): string {
    return 'build-script';
  }
}