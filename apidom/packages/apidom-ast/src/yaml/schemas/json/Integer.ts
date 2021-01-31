import stampit from 'stampit';

import Tag from '../Tag';

const Integer = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:int',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      return /^-?(0|[1-9][0-9]*)$/.test(node.content);
    },

    resolve(node) {
      const content = parseInt(node.content, 10);
      const nodeClone = node.clone();

      nodeClone.content = content;

      return nodeClone;
    },
  },
});

export default Integer;
