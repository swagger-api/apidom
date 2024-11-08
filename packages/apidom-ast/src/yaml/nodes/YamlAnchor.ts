import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';

export interface YamlAnchorOptions extends NodeOptions {
  readonly name: string;
}

class YamlAnchor extends Node {
  public static readonly type = 'anchor';

  public readonly name: string;

  constructor({ name, ...rest }: YamlAnchorOptions) {
    super({ ...rest });
    this.name = name;
  }
}

export default YamlAnchor;
