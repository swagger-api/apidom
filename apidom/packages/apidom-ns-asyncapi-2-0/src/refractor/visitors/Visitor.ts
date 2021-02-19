import stampit from 'stampit';
import { hasElementSourceMap } from 'apidom';

const Visitor = stampit({
  props: {
    element: null,
    namespace: null,
  },
  // @ts-ignore
  init({ namespace = this.namespace } = {}) {
    this.namespace = namespace;
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
