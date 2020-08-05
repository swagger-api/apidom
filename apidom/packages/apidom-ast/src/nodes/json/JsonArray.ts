import stampit from 'stampit';
import { anyPass, propEq } from 'ramda';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from './node-type';

interface JsonArray extends JsonNode, JsonComments {
  children: unknown[];
}

const JsonArray: stampit.Stamp<JsonArray> = stampit(JsonNode, JsonComments, {
  props: {
    children: [],
  },
  init({ children = [], position = null } = {}) {
    this.type = NodeType.Array;
    this.children = children;
    this.position = position;
  },
  methods: {
    get items(): unknown[] {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.children.filter(
        anyPass([
          propEq('type', NodeType.Comment),
          propEq('type', NodeType.False),
          propEq('type', NodeType.True),
          propEq('type', NodeType.Null),
          propEq('type', NodeType.Number),
          propEq('type', NodeType.String),
          propEq('type', NodeType.Array),
          propEq('type', NodeType.Object),
        ]),
      );
    },
  },
});

export default JsonArray;
