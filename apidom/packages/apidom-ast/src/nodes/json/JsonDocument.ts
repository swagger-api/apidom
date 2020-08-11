import stampit from 'stampit';
import { head } from 'ramda';

import Node from '../../Node';

interface JsonDocument extends Node {
  child: unknown | null;
}

const JsonDocument: stampit.Stamp<JsonDocument> = stampit(Node, {
  statics: {
    type: 'document',
  },
  methods: {
    // @ts-ignore
    get child(): unknown {
      // @ts-ignore
      return head(this.children);
    },
  },
});

export default JsonDocument;
