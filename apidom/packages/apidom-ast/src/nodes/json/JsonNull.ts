import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonNull = JsonValue;

const JsonNull: stampit.Stamp<JsonNull> = stampit(JsonValue, {
  statics: {
    type: 'null',
  },
});

export default JsonNull;
