import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import NodeType from '../node-type';
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
  init() {
    this.type = NodeType.Property;
  },
});

export default JsonProperty;
