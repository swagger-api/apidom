import stampit from 'stampit';
import { head } from 'ramda';

import Node from './Node';

interface ParseResult extends Node {
  type: 'parseResult';
  errors: unknown[];
  annotations: unknown[];
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
