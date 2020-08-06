import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonFalse = JsonValue;

const JsonFalse: stampit.Stamp<JsonFalse> = stampit(JsonValue, {
  statics: {
    type: 'false',
  },
});

export default JsonFalse;
