import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonKey = JsonValue;

const JsonKey: stampit.Stamp<JsonKey> = stampit(JsonValue, {
  init() {
    this.type = NodeType.Key;
  },
});

export default JsonKey;
