import Node from '../../Node';
import Position from '../../Position';

class YamlAnchor extends Node {
  public readonly type: string = 'anchor';

  public name: string | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    name = null,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    name?: string | null;
  } = {}) {
    super({ children, position, isMissing });
    this.name = name;
  }
}

export default YamlAnchor;
