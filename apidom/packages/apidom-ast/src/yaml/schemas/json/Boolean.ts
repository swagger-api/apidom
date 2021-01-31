import stampit from 'stampit';

import Tag from '../Tag';

const Boolean = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:bool',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      return /^(true|false)$/.test(node.content);
    },

    resolve(node) {
      const content = node.content === 'true';
      const nodeClone = node.clone();

      nodeClone.content = content;

      return nodeClone;
    },
  },
});

export default Boolean;
