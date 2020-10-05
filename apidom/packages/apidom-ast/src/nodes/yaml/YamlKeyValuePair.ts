import stampit from 'stampit';
import { filter, anyPass, pipe, nth, pathOr, identical, complement, both } from 'ramda';

import Node from '../../Node';
import YamlStyleModel from './YamlStyle';
import { isScalar, isMapping, isSequence, isAlias } from './predicates';
import YamlScalar from './YamlScalar';
import YamlAlias from './YamlAlias';

interface YamlKeyValuePair extends Node, YamlStyleModel {
  type: 'keyValuePair';
  readonly key: YamlScalar;
  readonly value: YamlScalar | YamlAlias | null | any;
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
      const filtered = filter(both(excludeKeyPredicate, valuePredicate), this.children);
      return pathOr(null, [0], filtered);
    },
  },
});

export default YamlKeyValuePair;
