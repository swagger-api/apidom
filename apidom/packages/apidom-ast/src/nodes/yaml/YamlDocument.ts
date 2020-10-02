import stampit from 'stampit';
import { head } from 'ramda';

import Node from '../../Node';

interface YamlDocument extends Node {
  type: 'document';
  readonly child: unknown;
}

const YamlDocument: stampit.Stamp<YamlDocument> = stampit(Node, {
  statics: {
    type: 'document',
  },
  // @ts-ignore
  get child(): unknown {
    // @ts-ignore
    return head(this.children);
  },
});

export default YamlDocument;
