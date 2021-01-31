import stampit from 'stampit';

import ScalarTag from './ScalarTag';

const Tag = stampit(ScalarTag, {
  props: {
    tag: '',
  },
  methods: {
    resolve(value) {
      return value;
    },
  },
});

export default Tag;
