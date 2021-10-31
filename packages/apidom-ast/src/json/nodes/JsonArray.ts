import stampit from 'stampit';

import JsonNode from './JsonNode';
import { isFalse, isTrue, isNull, isNumber, isString, isArray, isObject } from './predicates';

type JsonArray = JsonNode;

const JsonArray: stampit.Stamp<JsonArray> = stampit(JsonNode, {
  statics: {
    type: 'array',
  },
  methods: {
    get items(): unknown[] {
      // @ts-ignore
      return this.children.filter(
        (node: any) =>
          isFalse(node) ||
          isTrue(node) ||
          isNull(node) ||
          isNumber(node) ||
          isString(node) ||
          isArray(node) ||
          isObject,
      );
    },
  },
});

export default JsonArray;
