import Node from '../../Node';
import YamlDocument from './YamlDocument';
import YamlComment from './YamlComment';
import { isComment, isDocument } from './predicates';

class YamlStream extends Node {
  public readonly type: string = 'stream';
}

Object.defineProperty(YamlStream, 'content', {
  get(): Array<YamlDocument | YamlComment> {
    return Array.isArray(this.children)
      ? this.children.filter((node: unknown) => isDocument(node) || isComment(node))
      : [];
  },
  enumerable: true,
});

export default YamlStream;
