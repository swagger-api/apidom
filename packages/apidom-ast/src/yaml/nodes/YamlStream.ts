import stampit from 'stampit';

import Node from '../../Node';
import YamlDocument from './YamlDocument';
import YamlComment from './YamlComment';
import { isComment, isDocument } from './predicates';

interface YamlStream extends Node {
  type: 'stream';
  readonly content: Array<YamlDocument | YamlComment>;
  children: Array<YamlDocument>;
}

const YamlStream: stampit.Stamp<YamlStream> = stampit(Node, {
  statics: {
    type: 'stream',
  },
  propertyDescriptors: {
    content: {
      get(): Array<YamlDocument | YamlComment> {
        // @ts-ignore
        return Array.isArray(this.children)
          ? // @ts-ignore
            this.children.filter((node: any) => isDocument(node) || isComment(node))
          : [];
      },
      enumerable: true,
    },
  },
});

export default YamlStream;
