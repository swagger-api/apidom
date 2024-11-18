import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';

/**
 * @public
 */
export interface YamlAliasOptions extends NodeOptions {
  readonly content: string;
}

/**
 * @public
 */
class YamlAlias extends Node {
  public static readonly type = 'alias';

  public readonly content: string;

  constructor({ content, ...rest }: YamlAliasOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlAlias;
