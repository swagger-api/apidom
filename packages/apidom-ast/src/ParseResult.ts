import stampit from 'stampit';
import { head } from 'ramda';

import Node from './Node';

interface ParseResult extends Node {
  type: 'parseResult';
  rootNode: unknown;
}

const ParseResult: stampit.Stamp<ParseResult> = stampit(Node, {
  statics: {
    type: 'parseResult',
  },
  methods: {
    // @ts-ignore
    get rootNode(): unknown {
      // @ts-ignore
      return head(this.children);
    },
  },
});

export default ParseResult;
