import stampit from 'stampit';
import { filter, anyPass, pipe, nth } from 'ramda';

import Node from '../../Node';
import YamlStyleModel from './YamlStyle';
import { isScalar, isMapping, isSequence } from './predicates';

interface YamlKeyValuePair extends Node, YamlStyleModel {
  type: 'keyValuePair';
  readonly key: unknown;
  readonly value: unknown;
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(Node, YamlStyleModel, {
  statics: {
    type: 'keyValuePair',
  },
  methods: {
    // @ts-ignore
    get key(): unknown {
      // @ts-ignore
      return pipe(filter(anyPass([isScalar, isMapping, isSequence])), nth(0))(this.children);
    },
    // @ts-ignore
    get value(): unknown {
      // @ts-ignore
      return pipe(filter(anyPass([isScalar, isMapping, isSequence])), nth(1))(this.children);
    },
  },
});

export default YamlKeyValuePair;
