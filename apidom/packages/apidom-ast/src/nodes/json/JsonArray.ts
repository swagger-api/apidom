import stampit from 'stampit';
import { anyPass } from 'ramda';

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
        anyPass([isFalse, isTrue, isNull, isNumber, isString, isArray, isObject]),
      );
    },
  },
});

export default JsonArray;
