import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from '../node-type';

type JsonString = JsonValue;

const JsonString: stampit.Stamp<JsonString> = stampit(JsonValue, {
  init() {
    this.type = NodeType.String;
  },
});

export default JsonString;
