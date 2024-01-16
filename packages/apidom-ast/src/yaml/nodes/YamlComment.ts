import Node, { NodeConstructor } from '../../Node';

interface YamlCommentConstructor extends NodeConstructor {
  content?: string | null;
}

class YamlComment extends Node {
  public readonly type: string = 'comment';

  public content: string | null;

  constructor({
    children = [],
    position = null,
    isMissing = false,
    content = null,
  }: YamlCommentConstructor = {}) {
    super({ children, position, isMissing });
    this.content = content;
  }
}

export default YamlComment;
