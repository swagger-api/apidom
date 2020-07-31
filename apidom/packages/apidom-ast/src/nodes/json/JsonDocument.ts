import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from './node-type';

interface JsonDocument extends JsonNode, JsonComments {
  child: JsonNode | null;
}

const JsonDocument: stampit.Stamp<JsonDocument> = stampit(JsonNode, JsonComments, {
  props: {
    child: null,
  },
  init({ child = null, position = null } = {}) {
    this.type = NodeType.Document;
    this.child = child;
    this.position = position;
  },
});

export default JsonDocument;
