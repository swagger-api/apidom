import stampit from 'stampit';

import JsonNode from './JsonNode';

interface JsonValue extends JsonNode {
  value: unknown;
}

const JsonValue: stampit.Stamp<JsonValue> = stampit(JsonNode, {
  statics: {
    type: 'value',
  },
  props: {
    value: null,
  },
  init({ value = null } = {}) {
    this.value = value;
  },
});

export default JsonValue;
