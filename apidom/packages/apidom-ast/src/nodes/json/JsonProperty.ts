import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import NodeType from './node-type';
import JsonKey from './JsonKey';
import JsonValue from './JsonValue';

interface JsonProperty extends JsonNode {
  key: JsonKey;
  value: JsonValue;
}

const JsonProperty: stampit.Stamp<JsonProperty> = stampit(JsonNode, {
  props: {
    key: null,
    value: null,
  },
  init({ key = null, value = null, position = null } = {}) {
    this.type = NodeType.Property;
    this.key = key;
    this.value = value;
    this.position = position;
  },
});

export default JsonProperty;
