import stampit from 'stampit';
import { anyPass } from 'ramda';

import Node from '../../Node';
import { isFalse, isTrue, isNull, isNumber, isString, isArray, isObject } from './predicates';

type JsonArray = Node;

const JsonArray: stampit.Stamp<JsonArray> = stampit(Node, {
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
