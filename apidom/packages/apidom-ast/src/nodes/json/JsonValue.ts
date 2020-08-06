import stampit from 'stampit';

import Node from '../../Node';

interface JsonValue extends Node {
  value: unknown;
}

const JsonValue: stampit.Stamp<JsonValue> = stampit(Node, {
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
