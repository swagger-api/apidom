import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlAliasOptions extends NodeOptions {
  content?: string | null;
}

class YamlAlias extends Node {
  public static readonly type: string = 'alias';

  public content: string | null;

  constructor({ content = null, ...rest }: YamlAliasOptions = {}) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlAlias;
