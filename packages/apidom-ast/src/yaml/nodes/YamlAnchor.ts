import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlAnchorOptions extends NodeOptions {
  name?: string | null;
}

class YamlAnchor extends Node {
  public static readonly type: string = 'anchor';

  public name: string | null;

  constructor({ name = null, ...rest }: YamlAnchorOptions = {}) {
    super({ ...rest });
    this.name = name;
  }
}

export default YamlAnchor;
