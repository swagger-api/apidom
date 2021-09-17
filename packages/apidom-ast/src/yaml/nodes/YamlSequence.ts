import stampit from 'stampit';
import { anyPass } from 'ramda';
import { isArray } from 'ramda-adjunct';

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

        return isArray(children)
          ? children.filter(anyPass([isSequence, isMapping, isScalar, isAlias]))
          : [];
      },
      enumerable: true,
    },
  },
});

export default YamlSequence;
