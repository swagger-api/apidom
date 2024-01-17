import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlAnchorOptions extends NodeOptions {
  readonly name: string;
}

class YamlAnchor extends Node {
  public static readonly type: string = 'anchor';

  public readonly name: string;

  constructor({ name, ...rest }: YamlAnchorOptions) {
    super({ ...rest });
    this.name = name;
  }
}

export default YamlAnchor;
