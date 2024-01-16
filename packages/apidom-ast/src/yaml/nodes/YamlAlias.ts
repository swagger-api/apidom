import Node, { NodeConstructor } from '../../Node';

interface YamlAliasConstructor extends NodeConstructor {
  content?: string | null;
}

class YamlAlias extends Node {
  public readonly type: string = 'alias';

  public content: string | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    content = null,
  }: YamlAliasConstructor = {}) {
    super({ children, position, isMissing });
    this.content = content;
  }
}

export default YamlAlias;
