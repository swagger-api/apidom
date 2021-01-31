import stampit from 'stampit';

import Tag from '../Tag';

const FloatingPoint = stampit(Tag, {
  statics: {
    uri: 'tag:yaml.org,2002:float',
  },
  init(args, { stamp }) {
    this.tag = stamp.uri;
  },
  methods: {
    test(node) {
      return /^-?(0|[1-9][0-9]*)(\.[0-9]*)?([eE][-+]?[0-9]+)?$/.test(node.content);
    },

    resolve(node) {
      const content = parseFloat(node.content);
      const nodeClone = node.clone();

      nodeClone.content = content;

      return nodeClone;
    },
  },
});

export default FloatingPoint;
