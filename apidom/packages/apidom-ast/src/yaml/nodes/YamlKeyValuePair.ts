import stampit from 'stampit';
import { filter, anyPass, pipe, nth, identical, complement, both } from 'ramda';

import Node from '../../Node';
import YamlStyleModel from './YamlStyle';
import { isScalar, isMapping, isSequence, isAlias } from './predicates';
import YamlScalar from './YamlScalar';

interface YamlKeyValuePair extends Node, YamlStyleModel {
  type: 'keyValuePair';
  readonly key: YamlScalar;
  readonly value: any;
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
      const excludeKeyPredicate = complement(identical(this.key));
      const valuePredicate = anyPass([isScalar, isMapping, isSequence, isAlias]);
      // @ts-ignore
      return pipe(filter(both(excludeKeyPredicate, valuePredicate)), nth(0))(this.children);
    },
  },
});

export default YamlKeyValuePair;
