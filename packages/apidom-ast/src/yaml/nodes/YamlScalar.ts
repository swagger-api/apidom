import YamlNode from './YamlNode.ts';
import type { YamlNodeOptions } from './YamlNode.ts';

export interface YamlScalarOptions extends YamlNodeOptions {
  readonly content: string;
}

class YamlScalar extends YamlNode {
  public static readonly type = 'scalar';

  public readonly content: string;

  constructor({ content, ...rest }: YamlScalarOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlScalar;
