import { StringCommandParameter } from '../command-parameter';

export class OutFileBuilder {
  createForFile(file: string): OutFile {
    return OutFile.createForFile(file);
  }
}

export class OutFile extends StringCommandParameter {
  static createForFile(file: string): OutFile {
    return new OutFile('out-file', file);
  }
}
