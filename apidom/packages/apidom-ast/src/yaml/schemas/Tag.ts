import stampit from 'stampit';

import ScalarTag from './ScalarTag';

const Tag = stampit(ScalarTag, {
  props: {
    tag: '',
  },
});

export default Tag;
