import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlAliasOptions extends NodeOptions {
  readonly content: string;
}

class YamlAlias extends Node {
  public static readonly type: string = 'alias';

  public readonly content: string;

  constructor({ content, ...rest }: YamlAliasOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlAlias;
