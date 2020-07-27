import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from '../node-type';

type JsonDocument = JsonNode & JsonComments;

const JsonDocument: stampit.Stamp<JsonDocument> = stampit(JsonNode, JsonComments, {
  props: {
    child: null,
  },
  init() {
    this.type = NodeType.Document;
  },
});

export default JsonDocument;
