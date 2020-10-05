import stampit from 'stampit';
import { filter, anyPass, pipe, nth } from 'ramda';

import Node from '../../Node';
import YamlStyleModel from './YamlStyle';
import { isScalar, isMapping, isSequence } from './predicates';
import YamlScalar from './YamlScalar';

interface YamlKeyValuePair extends Node, YamlStyleModel {
  type: 'keyValuePair';
  readonly key: YamlScalar;
  readonly value: YamlScalar | any;
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(Node, YamlStyleModel, {
  statics: {
    type: 'keyValuePair',
  },
  methods: {
    // @ts-ignore
    get key() {
      // @ts-ignore
      return pipe(filter(anyPass([isScalar, isMapping, isSequence])), nth(0))(this.children);
    },
    // @ts-ignore
    get value() {
      // @ts-ignore
      return pipe(filter(anyPass([isScalar, isMapping, isSequence])), nth(1))(this.children);
    },
  },
});

export default YamlKeyValuePair;
