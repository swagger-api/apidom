import Node from '../../Node.ts';
import type { NodeOptions } from '../../Node.ts';

export interface YamlCommentOptions extends NodeOptions {
  readonly content: string;
}

class YamlComment extends Node {
  public static readonly type = 'comment';

  public readonly content: string;

  constructor({ content, ...rest }: YamlCommentOptions) {
    super({ ...rest });
    this.content = content;
  }
}

export default YamlComment;
