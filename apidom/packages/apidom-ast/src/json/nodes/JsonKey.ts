import stampit from 'stampit';

import JsonString from './JsonString';

type JsonKey = JsonString;

const JsonKey: stampit.Stamp<JsonKey> = stampit(JsonString, {
  statics: {
    type: 'key',
  },
});

export default JsonKey;
