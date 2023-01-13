import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

class DumpRawHelpDocs {
  private rawDocPath: string;
  constructor(private cliPath: string) {
    this.rawDocPath = path.resolve('docs/raw-help');
    this.ensureDirectoryExists(this.rawDocPath);
  }

  createDocFileForCommands(...commands: string[]): [string, string] {
    return [path.join(this.rawDocPath, `${commands.join('_')}.txt`), commands.join(' ')];
  }

  getCommandFileMapping(): Map<string, string> {
    const commandMapping: Map<string, string> = new Map();

    //address
    return commandMapping
      .set(...this.createDocFileForCommands('address'))
      .set(...this.createDocFileForCommands('address', 'key-gen'))
      .set(...this.createDocFileForCommands('address', 'key-hash'))
      .set(...this.createDocFileForCommands('address', 'build'))
      .set(...this.createDocFileForCommands('address', 'build-script'))
      .set(...this.createDocFileForCommands('address', 'info'));
  }

  generate(): void {
    const commandsToRun = this.getCommandFileMapping();
    // file command=>file

    commandsToRun.forEach((command: string, docPath: string) => {
      const result = this.runCommand(`${this.cliPath} ${command} -h`);
      console.log(`writing command: ${command} to file: ${docPath}`);
      fs.writeFileSync(docPath, result);
    });
  }

  ensureDirectoryExists(path: string) {
    if (!fs.existsSync(path)) this.runCommand(`mkdir -p ${path}`);
  }

  runCommand: (command: string) => string = (command: string) => {
    return execSync(command).toString();
  };
}

new DumpRawHelpDocs('cardano-cli').generate();
