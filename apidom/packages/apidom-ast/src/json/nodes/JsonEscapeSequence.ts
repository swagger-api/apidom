import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonEscapeSequence = JsonValue;

const JsonEscapeSequence: stampit.Stamp<JsonEscapeSequence> = stampit(JsonValue, {
  statics: {
    type: 'escapeSequence',
  },
});

export default JsonEscapeSequence;
