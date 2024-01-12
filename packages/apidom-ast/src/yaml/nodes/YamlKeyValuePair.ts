import stampit from 'stampit';

import Node from '../../Node';
import type { YamlStyleModel } from './YamlStyle';
import { isScalar, isMapping, isSequence, isAlias } from './predicates';
import YamlScalar from './YamlScalar';

interface YamlKeyValuePair extends Node, Omit<YamlStyleModel, 'style'> {
  type: 'keyValuePair';
  readonly key: YamlScalar;
  readonly value: any;
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(Node, {
  statics: {
    type: 'keyValuePair',
  },
  props: {
    styleGroup: null,
  },
  propertyDescriptors: {
    key: {
      get() {
        // @ts-ignore
        return this.children.filter(
          (node: any) => isScalar(node) || isMapping(node) || isSequence(node),
        )[0];
      },
      enumerable: true,
    },
    value: {
      get() {
        // @ts-ignore
        const { key, children } = this;
        const excludeKeyPredicate = (node: any) => node !== key;
        const valuePredicate = (node: any) =>
          isScalar(node) || isMapping(node) || isSequence(node) || isAlias(node);

        // @ts-ignore
        return children.filter((node: any) => excludeKeyPredicate(node) && valuePredicate(node))[0];
      },
      enumerable: true,
    },
  },
});

export default YamlKeyValuePair;
