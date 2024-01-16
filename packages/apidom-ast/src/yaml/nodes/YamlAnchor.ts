import Node, { NodeConstructor } from '../../Node';

interface YamlAnchorConstructor extends NodeConstructor {
  name?: string | null;
}

class YamlAnchor extends Node {
  public readonly type: string = 'anchor';

  public name: string | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    name = null,
  }: YamlAnchorConstructor = {}) {
    super({ children, position, isMissing });
    this.name = name;
  }
}

export default YamlAnchor;
