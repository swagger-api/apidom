import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonEscapeSequence = JsonValue;

const JsonEscapeSequence: stampit.Stamp<JsonEscapeSequence> = stampit(JsonValue, {
  init() {
    this.type = NodeType.EscapeSequence;
  },
});

export default JsonEscapeSequence;
