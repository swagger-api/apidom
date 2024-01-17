import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlCommentOptions extends NodeOptions {
  content?: string | null;
}

class YamlComment extends Node {
  public static readonly type: string = 'comment';

  public content: string | null;

  constructor({ content = null, ...rest }: YamlCommentOptions = {}) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlComment;
