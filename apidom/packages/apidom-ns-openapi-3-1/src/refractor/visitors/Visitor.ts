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
      to.meta = from.meta; // eslint-disable-line no-param-reassign
      to.attributes = from.attributes; // eslint-disable-line no-param-reassign
    },
  },
});

export default Visitor;
