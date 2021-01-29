import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonTrue = JsonValue;

const JsonTrue: stampit.Stamp<JsonTrue> = stampit(JsonValue, {
  statics: {
    type: 'true',
  },
});

export default JsonTrue;
