import stampit from 'stampit';

import JsonValue from './JsonValue';

type JsonStringContent = JsonValue;

const JsonStringContent: stampit.Stamp<JsonStringContent> = stampit(JsonValue, {
  statics: {
    type: 'stringContent',
  },
});

export default JsonStringContent;
