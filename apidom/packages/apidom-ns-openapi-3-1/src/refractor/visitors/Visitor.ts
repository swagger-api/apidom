import stampit from 'stampit';

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
      if (from.meta.hasKey('sourceMap')) {
        to.meta.set('sourceMap', from.meta.get('sourceMap'));
      }
    },
  },
});

export default Visitor;
