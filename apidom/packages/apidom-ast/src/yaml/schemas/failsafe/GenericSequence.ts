import stampit from 'stampit';

import Tag from '../Tag';
import { YamlNodeKind } from '../../nodes/YamlTag';

const GenericSequence = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:seq',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      // @ts-ignore
      return node.tag.kind === YamlNodeKind.Sequence;
    },

    resolve(node) {
      return node;
    },
  },
});

export default GenericSequence;
