import { CommandOptions } from './command-options';
export abstract class Command<T extends CommandOptions> {
  constructor(private readonly commandPrefix: string, private options: T) {}

  abstract getCommandName(): string;

  getCommand(): string {
    const output: string[] = [this.commandPrefix, this.getCommandName(), this.options.toString()];
    return output.join(' ');
  }
}
