import stampit from 'stampit';

import { addSourceMap } from '../source-map';

const Visitor = stampit({
  props: {
    element: null,
    namespace: null,
    sourceMap: false,
    keyMap: null,
  },
  // @ts-ignore
  init({ namespace = this.namespace, sourceMap = this.sourceMap, element = this.element } = {}) {
    this.namespace = namespace;
    this.sourceMap = sourceMap;
    this.element = element;
  },
  methods: {
    maybeAddSourceMap(node, element) {
      if (!this.sourceMap) {
        return element;
      }

      return addSourceMap(node, element);
    },
  },
});

export default Visitor;
