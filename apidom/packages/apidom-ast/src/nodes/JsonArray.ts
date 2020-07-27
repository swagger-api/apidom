import stampit from 'stampit';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from '../node-type';
import JsonComment from './JsonComment';

type JsonArray = JsonNode & JsonComment;

const JsonArray: stampit.Stamp<JsonArray> = stampit(JsonNode, JsonComments, {
  props: {
    items: [],
  },
  init() {
    this.type = NodeType.Array;
  },
});

export default JsonArray;
