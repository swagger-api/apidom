import Node from '../../Node.ts';
import YamlDocument from './YamlDocument.ts';
import YamlComment from './YamlComment.ts';
import { isComment, isDocument } from './predicates.ts';

class YamlStream extends Node {
  public static readonly type = 'stream';
}

Object.defineProperty(YamlStream.prototype, 'content', {
  get(): Array<YamlDocument | YamlComment> {
    return Array.isArray(this.children)
      ? this.children.filter((node: unknown) => isDocument(node) || isComment(node))
      : [];
  },
  enumerable: true,
});

export default YamlStream;
