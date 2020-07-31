import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import NodeType from './node-type';

interface JsonValue extends JsonNode {
  type: NodeType.Value;
  value: unknown;
}

const JsonValue: stampit.Stamp<JsonValue> = stampit(JsonNode, {
  props: {
    value: null,
  },
  init({ value = null, position = null } = {}) {
    this.type = NodeType.Value;
    this.value = value;
    this.position = position;
  },
});

export default JsonValue;
