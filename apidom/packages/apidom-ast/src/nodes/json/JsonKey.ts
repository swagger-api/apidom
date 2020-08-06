import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonKey = JsonValue;

const JsonKey: stampit.Stamp<JsonKey> = stampit(JsonValue, {
  statics: {
    type: 'key',
  },
});

export default JsonKey;
