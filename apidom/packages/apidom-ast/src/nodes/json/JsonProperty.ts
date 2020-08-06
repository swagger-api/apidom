import stampit from 'stampit';
import { head, last } from 'ramda';

import Node from '../../Node';
import JsonKey from './JsonKey';

interface JsonProperty extends Node {
  key: JsonKey;
  value: unknown;
}

const JsonProperty: stampit.Stamp<JsonProperty> = stampit(Node, {
  statics: {
    type: 'property',
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    get key(): unknown {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return head(this.children);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    get value(): unknown {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return last(this.children);
    },
  },
});

export default JsonProperty;
