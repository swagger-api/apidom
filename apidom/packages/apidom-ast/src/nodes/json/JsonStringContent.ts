import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonStringContent = JsonValue;

const JsonStringContent: stampit.Stamp<JsonStringContent> = stampit(JsonValue, {
  init() {
    this.type = NodeType.StringContent;
  },
});

export default JsonStringContent;
