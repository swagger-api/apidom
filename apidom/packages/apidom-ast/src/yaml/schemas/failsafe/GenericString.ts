import stampit from 'stampit';

import Tag from '../Tag';

const GenericString = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:str',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    resolve(node) {
      return this.canonicalFormat(node);
    },
  },
});

export default GenericString;
