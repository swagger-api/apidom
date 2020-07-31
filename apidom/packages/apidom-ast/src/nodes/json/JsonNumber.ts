import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonNumber = JsonValue;

const JsonNumber: stampit.Stamp<JsonNumber> = stampit(JsonValue, {
  init() {
    this.type = NodeType.Number;
  },
});

export default JsonNumber;
