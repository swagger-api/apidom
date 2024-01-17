import Node from '../../Node';
import Position from '../../Position';

class YamlAlias extends Node {
  public readonly type: string = 'alias';

  public content: string | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    content = null,
  }: {
    children?: unknown[];
    position?: Position | null;
    isMissing?: boolean;
    content?: string | null;
  } = {}) {
    super({ children, position, isMissing });
    this.content = content;
  }
}

export default YamlAlias;
