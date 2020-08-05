import stampit from 'stampit';
import { propEq, either } from 'ramda';

import JsonNode from './traits/JsonNode';
import JsonComments from './traits/JsonComments';
import NodeType from './node-type';

interface JsonObject extends JsonNode, JsonComments {
  children: unknown[];
  properties: unknown;
}

const JsonObject: stampit.Stamp<JsonObject> = stampit(JsonNode, JsonComments, {
  props: {
    children: [],
  },
  init({ children = [], position = null } = {}) {
    this.type = NodeType.Object;
    this.children = children;
    this.position = position;
  },
  methods: {
    get properties(): unknown[] {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.children.filter(
        either(propEq('type', NodeType.Property), propEq('type', NodeType.Comment)),
      );
    },
  },
});

export default JsonObject;
