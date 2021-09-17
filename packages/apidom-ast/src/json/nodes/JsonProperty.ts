import stampit from 'stampit';
import { anyPass } from 'ramda';

import JsonNode from './JsonNode';
import JsonKey from './JsonKey';
import {
  isArray,
  isFalse,
  isKey,
  isNull,
  isNumber,
  isObject,
  isString,
  isTrue,
} from './predicates';

interface JsonProperty extends JsonNode {
  key: JsonKey;
  value: unknown;
}

const JsonProperty: stampit.Stamp<JsonProperty> = stampit(JsonNode, {
  statics: {
    type: 'property',
  },
  methods: {
    // @ts-ignore
    get key(): JsonKey {
      // @ts-ignore
      return this.children.find(isKey);
    },
    // @ts-ignore
    get value(): unknown {
      // @ts-ignore
      return this.children.find(
        anyPass([isFalse, isTrue, isNull, isNumber, isString, isArray, isObject]),
      );
    },
  },
});

export default JsonProperty;
