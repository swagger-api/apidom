import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import NodeType from '../node-type';

interface JsonValue extends JsonNode {
  type: NodeType.Value;
  value: unknown;
}

const JsonValue: stampit.Stamp<JsonValue> = stampit(JsonNode, {
  props: {
    value: null,
  },
  init() {
    this.type = NodeType.Value;
  },
});

export default JsonValue;
