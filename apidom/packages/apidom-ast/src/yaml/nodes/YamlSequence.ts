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
  methods: {
    get content(): Array<YamlSequence | YamlMapping | YamlScalar | YamlAlias> {
      return isArray(this.children)
        ? this.children.filter(anyPass([isSequence, isMapping, isScalar, isAlias]))
        : [];
    },
  },
});

export default YamlSequence;
