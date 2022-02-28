import stampit from 'stampit';
import { hasElementSourceMap } from '@swagger-api/apidom-core';

const Visitor = stampit({
  props: {
    element: null,
  },
  methods: {
    copyMetaAndAttributes(from, to) {
      // copy sourcemaps
      if (hasElementSourceMap(from)) {
        to.meta.set('sourceMap', from.meta.get('sourceMap'));
      }
    },
  },
});

export default Visitor;
