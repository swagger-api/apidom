import stampit from 'stampit';

import JsonNode from './JsonNode';
import { isProperty } from './predicates';

type JsonObject = JsonNode;

const JsonObject: stampit.Stamp<JsonObject> = stampit(JsonNode, {
  statics: {
    type: 'object',
  },
  methods: {
    get properties(): unknown[] {
      // @ts-ignore
      return this.children.filter(isProperty);
    },
  },
});

export default JsonObject;
