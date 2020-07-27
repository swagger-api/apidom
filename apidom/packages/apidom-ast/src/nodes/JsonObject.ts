import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from '../node-type';

type JsonObject = JsonNode & JsonComments;

const JsonObject: stampit.Stamp<JsonObject> = stampit(JsonNode, JsonComments, {
  props: {
    properties: [],
  },
  init() {
    this.type = NodeType.Object;
  },
});

export default JsonObject;
