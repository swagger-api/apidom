import stampit from 'stampit';

import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

const GenericMapping = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:map',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      // @ts-ignore
      return node.tag.kind === YamlNodeKind.Mapping;
    },

    resolve(node) {
      return node;
    },
  },
});

export default GenericMapping;
