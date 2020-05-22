'use strict';

const stampit = require('stampit');
const { pathSatisfies, path, pick } = require('ramda');
const { isFunction } = require('ramda-adjunct');
const Visitor = require('./Visitor');
const { visit } = require('../visitor');

/**
 * This is a base Type for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
const SpecificationVisitor = stampit(Visitor, {
  props: {
    specObj: null,
  },
  init({ specObj = this.specObj }) {
    this.specObj = specObj;
  },
  methods: {
    retrieveVisitor(specPath) {
      if (pathSatisfies(isFunction, ['visitors', ...specPath], this.specObj)) {
        return path(['visitors', ...specPath], this.specObj);
      }

      return path(['visitors', ...specPath, '$visitor'], this.specObj);
    },

    retrieveVisitorInstance(specPath, options = {}) {
      const passingOpts = pick(['namespace', 'sourceMap', 'specObj'], this);

      return this.retrieveVisitor(specPath)(Object.assign({}, passingOpts, options));
    },

    mapPropertyNodeToMemberElement(specPath, propertyNode) {
      const visitor = this.retrieveVisitorInstance(specPath);

      visit(propertyNode, visitor);

      return visitor.element;
    },
  },
});

module.exports = SpecificationVisitor;
