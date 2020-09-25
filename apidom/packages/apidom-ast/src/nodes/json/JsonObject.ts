import stampit from 'stampit';

import JsonNode from './JsonNode';
import JsonProperty from './JsonProperty';
import { isProperty } from './predicates';

type JsonObject = JsonNode;

const JsonObject: stampit.Stamp<JsonObject> = stampit(JsonNode, {
  statics: {
    type: 'object',
  },
  methods: {
    get properties(): Array<JsonProperty> {
      // @ts-ignore
      return this.children.filter(isProperty);
    },
  },
});

export default JsonObject;
