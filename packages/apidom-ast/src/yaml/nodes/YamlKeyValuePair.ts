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
  propertyDescriptors: {
    key: {
      get() {
        // @ts-ignore
        return pipe(filter(anyPass([isScalar, isMapping, isSequence])), nth(0))(this.children);
      },
      enumerable: true,
    },
    value: {
      get() {
        // @ts-ignore
        const { key, children } = this;
        const excludeKeyPredicate = complement(identical(key));
        const valuePredicate = anyPass([isScalar, isMapping, isSequence, isAlias]);
        // @ts-ignore
        return pipe(filter(both(excludeKeyPredicate, valuePredicate)), nth(0))(children);
      },
      enumerable: true,
    },
  },
});

export default YamlKeyValuePair;
