import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonFalse = JsonValue;

const JsonFalse: stampit.Stamp<JsonFalse> = stampit(JsonValue, {
  init() {
    this.type = NodeType.False;
  },
});

export default JsonFalse;
