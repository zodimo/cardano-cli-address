import { BuildScript, BuildScriptOptions } from './address/build-script';
import { Build, BuildOptions } from './address/build';
import { Info, InfoOptions } from './address/info';
import { KeyGen, KeyGenOptions } from './address/key-gen';
import { KeyHash, KeyHashOptions } from './address/key-hash';
import { Builder } from './builder';

export class Address {
  public readonly commandPrefix: string;
  constructor(commandPrefix: string) {
    this.commandPrefix = `${commandPrefix} address`;
  }

  static createWithCardanoCliBin(cardniCliBinPath = 'cardano-cli'): Address {
    return new Address(cardniCliBinPath);
  }

  // key-gen

  keyGen(builder: Builder<KeyGenOptions, KeyGenOptions>): KeyGen;
  keyGen(options: KeyGenOptions): KeyGen;
  keyGen(value: KeyGenOptions | Builder<KeyGenOptions, KeyGenOptions>): KeyGen {
    if (value instanceof KeyGenOptions) {
      return new KeyGen(this.commandPrefix, value);
    }
    const options = value(new KeyGenOptions());
    return this.keyGen(options);
  }

  //key-hash

  keyHash(builder: Builder<KeyHashOptions, KeyHashOptions>): KeyHash;
  keyHash(options: KeyHashOptions): KeyHash;
  keyHash(value: KeyHashOptions | Builder<KeyHashOptions, KeyHashOptions>): KeyHash {
    if (value instanceof KeyHashOptions) {
      return new KeyHash(this.commandPrefix, value);
    }

    const options = value(new KeyHashOptions());
    return this.keyHash(options);
  }

  //build

  build(builder: Builder<BuildOptions, BuildOptions>): Build;
  build(options: BuildOptions): Build;
  build(value: BuildOptions | Builder<BuildOptions, BuildOptions>): Build {
    if (value instanceof BuildOptions) {
      return new Build(this.commandPrefix, value);
    }
    const options = value(new BuildOptions());
    return this.build(options);
  }

  // build-script

  buildScript(builder: Builder<BuildScriptOptions, BuildScriptOptions>): BuildScript;
  buildScript(options: BuildScriptOptions): BuildScript;
  buildScript(value: BuildScriptOptions | Builder<BuildScriptOptions, BuildScriptOptions>): BuildScript {
    if (value instanceof BuildScriptOptions) {
      return new BuildScript(this.commandPrefix, value);
    }
    const options = value(new BuildScriptOptions());
    return this.buildScript(options);
  }

  // info

  info(builder: Builder<InfoOptions, InfoOptions>): Info;
  info(options: InfoOptions): Info;
  info(value: InfoOptions | Builder<InfoOptions, InfoOptions>): Info {
    if (value instanceof InfoOptions) {
      return new Info(this.commandPrefix, value);
    }
    const options = value(new InfoOptions());
    return this.info(options);
  }
}
