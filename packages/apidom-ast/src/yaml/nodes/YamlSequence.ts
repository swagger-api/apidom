import stampit from 'stampit';

import YamlCollection from './YamlCollection';
import YamlMapping from './YamlMapping';
import YamlScalar from './YamlScalar';
import YamlAlias from './YamlAlias';
import { isMapping, isScalar, isSequence, isAlias } from './predicates';

interface YamlSequence extends YamlCollection {
  type: 'sequence';
  readonly content: Array<YamlSequence | YamlMapping | YamlScalar | YamlAlias>;
}

const YamlSequence: stampit.Stamp<YamlSequence> = stampit(YamlCollection, {
  statics: {
    type: 'sequence',
  },
  propertyDescriptors: {
    content: {
      get(): Array<YamlSequence | YamlMapping | YamlScalar | YamlAlias> {
        // @ts-ignore
        const { children } = this;

        return Array.isArray(children)
          ? children.filter(
              (node: any) => isSequence(node) || isMapping(node) || isScalar(node) || isAlias(node),
            )
          : [];
      },
      enumerable: true,
    },
  },
});

export default YamlSequence;
