import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from '../node-type';

type JsonNull = JsonValue;

const JsonNull: stampit.Stamp<JsonNull> = stampit(JsonValue, {
  init() {
    this.type = NodeType.Null;
  },
});

export default JsonNull;
