import YamlNode from './YamlNode';
import type { YamlNodeOptions } from './YamlNode';

export interface YamlScalarOptions extends YamlNodeOptions {
  readonly content: string;
}

class YamlScalar extends YamlNode {
  public static readonly type: string = 'scalar';

  public readonly content: string;

  constructor({ content, ...rest }: YamlScalarOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlScalar;
