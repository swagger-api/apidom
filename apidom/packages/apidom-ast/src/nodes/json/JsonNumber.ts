import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonNumber = JsonValue;

const JsonNumber: stampit.Stamp<JsonNumber> = stampit(JsonValue, {
  statics: {
    type: 'number',
  },
});

export default JsonNumber;
