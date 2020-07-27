import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from '../node-type';

type JsonTrue = JsonValue;

const JsonTrue: stampit.Stamp<JsonTrue> = stampit(JsonValue, {
  init() {
    this.type = NodeType.True;
  },
});

export default JsonTrue;
