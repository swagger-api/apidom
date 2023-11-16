import stampit from 'stampit';
import { pathSatisfies, path, pick } from 'ramda';
import { isFunction, isUndefined } from 'ramda-adjunct';
import { visit, cloneDeep } from '@swagger-api/apidom-core';

import Visitor from './Visitor';
import { keyMap, getNodeType } from '../../traversal/visitor';

/**
 * This is a base Type for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
const SpecificationVisitor = stampit(Visitor, {
  props: {
    specObj: null,
    passingOptionsNames: ['specObj'],
  },
  init({
    // @ts-ignoreh
    specObj = this.specObj,
  }) {
    this.specObj = specObj;
  },
  methods: {
    retrievePassingOptions() {
      return pick(this.passingOptionsNames, this);
    },

    retrieveFixedFields(specPath) {
      const fixedFields = path(['visitors', ...specPath, 'fixedFields'], this.specObj);
      if (typeof fixedFields === 'object' && fixedFields !== null) {
        return Object.keys(fixedFields);
      }
      return [];
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
      /**
       * This is `Visitor shortcut`: mechanism for short circuiting the traversal and replacing
       * it by basic node cloning.
       *
       * Visiting the element is equivalent to cloning it  if the prototype of a visitor
       * is the same as the prototype of FallbackVisitor. If that's the case, we can avoid
       * bootstrapping the traversal cycle for fields that don't require any special visiting.
       */
      const visitor = this.retrieveVisitorInstance(specPath, options);
      const visitorPrototype = Object.getPrototypeOf(visitor);

      if (isUndefined(this.fallbackVisitorPrototype)) {
        this.fallbackVisitorPrototype = Object.getPrototypeOf(
          this.retrieveVisitorInstance(['value']),
        );
      }
      if (this.fallbackVisitorPrototype === visitorPrototype) {
        return cloneDeep(element);
      }

      // standard processing continues
      visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType, ...options });
      return visitor.element;
    },
  },
});

export default SpecificationVisitor;
