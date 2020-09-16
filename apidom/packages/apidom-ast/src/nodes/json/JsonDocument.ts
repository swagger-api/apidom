import stampit from 'stampit';
import { head } from 'ramda';

import JsonNode from './JsonNode';

interface JsonDocument extends Node {
  child: unknown | null;
}

const JsonDocument: stampit.Stamp<JsonDocument> = stampit(JsonNode, {
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
