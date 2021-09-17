import stampit from 'stampit';
import { isArray } from 'ramda-adjunct';

import YamlCollection from './YamlCollection';
import { isKeyValuePair } from './predicates';
import YamlKeyValuePair from './YamlKeyValuePair';

interface YamlMapping extends YamlCollection {
  type: 'mapping';
  readonly content: Array<YamlKeyValuePair>;
}

const YamlMapping: stampit.Stamp<YamlMapping> = stampit(YamlCollection, {
  statics: {
    type: 'mapping',
  },
  propertyDescriptors: {
    content: {
      get(): Array<YamlKeyValuePair> {
        // @ts-ignore
        return isArray(this.children) ? this.children.filter(isKeyValuePair) : [];
      },
      enumerable: true,
    },
  },
});

export default YamlMapping;
