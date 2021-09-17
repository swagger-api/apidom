import stampit from 'stampit';

import Tag from '../Tag';

const Null = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:null',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      return /^null$/.test(node.content);
    },

    resolve(node) {
      const nodeClone = node.clone();

      nodeClone.content = null;

      return nodeClone;
    },
  },
});

export default Null;
