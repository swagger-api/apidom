import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from './node-type';

interface JsonObject extends JsonNode, JsonComments {
  properties: unknown;
}

const JsonObject: stampit.Stamp<JsonObject> = stampit(JsonNode, JsonComments, {
  props: {
    properties: [],
  },
  init({ properties = null, position = null } = {}) {
    this.type = NodeType.Object;
    this.properties = properties;
    this.position = position;
  },
});

export default JsonObject;
