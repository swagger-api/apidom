import { pathSatisfies, path, pick } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { visit, cloneDeep } from '@swagger-api/apidom-core';

import { keyMap, getNodeType } from '../../traversal/visitor';
import Visitor from './Visitor';
import FallbackVisitor from './FallbackVisitor';
import type specification from '../specification';

/**
 * This is a base class for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
class SpecificationVisitor extends Visitor {
  public readonly specObj!: typeof specification;

  public readonly passingOptionsNames = ['specObj'];

  constructor(options = {}) {
    super();
    Object.assign(this, options);
  }

  retrievePassingOptions() {
    return pick(this.passingOptionsNames as (keyof this)[], this);
  }

  retrieveFixedFields(specPath: string[]) {
    const fixedFields = path(['visitors', ...specPath, 'fixedFields'], this.specObj);
    if (typeof fixedFields === 'object' && fixedFields !== null) {
      return Object.keys(fixedFields);
    }
    return [];
  }

  retrieveVisitor(specPath: string[]) {
    if (pathSatisfies(isFunction, ['visitors', ...specPath], this.specObj)) {
      return path(['visitors', ...specPath], this.specObj);
    }
    return path(['visitors', ...specPath, '$visitor'], this.specObj);
  }

  retrieveVisitorInstance(specPath: string[], options = {}): Visitor {
    const passingOpts = this.retrievePassingOptions();
    const VisitorClz = this.retrieveVisitor(specPath) as typeof Visitor;
    const visitorOpts = { ...passingOpts, ...options };

    // @ts-ignore
    return new VisitorClz(visitorOpts as any);
  }

  toRefractedElement(specPath: string[], element: any, options = {}) {
    /**
     * This is `Visitor shortcut`: mechanism for short circuiting the traversal and replacing
     * it by basic node cloning.
     *
     * Visiting the element is equivalent to cloning it  if the prototype of a visitor
     * is the same as the prototype of FallbackVisitor. If that's the case, we can avoid
     * bootstrapping the traversal cycle for fields that don't require any special visiting.
     */
    const visitor = this.retrieveVisitorInstance(specPath, options);

    if (visitor instanceof FallbackVisitor && visitor?.constructor === FallbackVisitor) {
      return cloneDeep(element);
    }

    // @ts-ignore
    visit(element, visitor, { keyMap, ...options, nodeTypeGetter: getNodeType });
    return visitor.element;
  }
}

export default SpecificationVisitor;
