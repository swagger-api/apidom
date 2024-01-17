import YamlNode from './YamlNode';
import type { YamlNodeOptions } from './YamlNode';

export interface YamlScalarOptions extends YamlNodeOptions {
  content?: string | null;
}

class YamlScalar extends YamlNode {
  public static readonly type: string = 'scalar';

  public readonly content: string | null;

  public format: string | null = null;

  public text: string | null = null;

  constructor({ content = '', ...rest }: YamlScalarOptions = {}) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlScalar;
