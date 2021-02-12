import stampit from 'stampit';
import { pathSatisfies, path, pick, pipe, keys } from 'ramda';
import { isFunction } from 'ramda-adjunct';

import { visit } from '../../traversal/visitor';
import Visitor from './Visitor';

/**
 * This is a base Type for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
const SpecificationVisitor = stampit(Visitor, {
  props: {
    specObj: null,
  },
  // @ts-ignore
  init({ specObj = this.specObj }) {
    this.specObj = specObj;
  },
  methods: {
    retrievePassingOptions() {
      return pick(['namespace', 'specObj'], this);
    },

    retrieveFixedFields(specPath) {
      return pipe(path(['visitors', ...specPath, 'fixedFields']), keys)(this.specObj);
    },

    retrieveVisitor(specPath) {
      if (pathSatisfies(isFunction, ['visitors', ...specPath], this.specObj)) {
        return path(['visitors', ...specPath], this.specObj);
      }

      return path(['visitors', ...specPath, '$visitor'], this.specObj);
    },

    retrieveVisitorInstance(specPath, options = {}) {
      const passingOpts = this.retrievePassingOptions();

      return this.retrieveVisitor(specPath)({ ...passingOpts, ...options });
    },

    toRefractedElement(specPath: string[], element, options = {}) {
      const visitor = this.retrieveVisitorInstance(specPath);
      visit(element, visitor, options);
      return visitor.element;
    },
  },
});

export default SpecificationVisitor;
