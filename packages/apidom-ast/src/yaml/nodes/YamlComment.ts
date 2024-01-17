import Node from '../../Node';
import type { NodeOptions } from '../../Node';

export interface YamlCommentOptions extends NodeOptions {
  readonly content: string;
}

class YamlComment extends Node {
  public static readonly type: string = 'comment';

  public readonly content: string;

  constructor({ content, ...rest }: YamlCommentOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlComment;
