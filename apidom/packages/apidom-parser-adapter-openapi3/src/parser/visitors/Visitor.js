'use strict';

const stampit = require('stampit');
const { addSourceMap } = require('../source-map');

const Visitor = stampit({
  props: {
    element: null,
    namespace: null,
    sourceMap: false,
  },
  init({ namespace = this.namespace, sourceMap = this.sourceMap } = {}) {
    this.namespace = namespace;
    this.sourceMap = sourceMap;
  },
  methods: {
    maybeAddSourceMap(node, element) {
      if (!this.sourceMap) { return element; }

      return addSourceMap(node, element);
    }
  },
});

module.exports = Visitor;
