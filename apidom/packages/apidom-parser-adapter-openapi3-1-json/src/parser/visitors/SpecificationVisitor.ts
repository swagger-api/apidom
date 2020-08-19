import stampit from 'stampit';
import { pathSatisfies, path, pick } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import Visitor from './Visitor';
import { visit } from './index';

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
    retrieveVisitor(specPath) {
      if (pathSatisfies(isFunction, ['visitors', ...specPath], this.specObj)) {
        return path(['visitors', ...specPath], this.specObj);
      }

      return path(['visitors', ...specPath, '$visitor'], this.specObj);
    },

    retrieveVisitorInstance(specPath, options = {}) {
      const passingOpts = pick(['namespace', 'sourceMap', 'specObj'], this);

      return this.retrieveVisitor(specPath)({ ...passingOpts, ...options });
    },

    mapPropertyNodeToMemberElement(specPath, propertyNode) {
      const visitor = this.retrieveVisitorInstance(specPath);

      visit(propertyNode, visitor);

      return visitor.element;
    },
  },
});

export default SpecificationVisitor;
