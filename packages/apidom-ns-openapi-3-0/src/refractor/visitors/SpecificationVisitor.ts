import { pathSatisfies, path, pick } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { visit, cloneDeep, ObjectElement } from '@swagger-api/apidom-core';

import OpenApi3_0Element from '../../elements/OpenApi3-0';
import Visitor, { VisitorOptions } from './Visitor';
import type specification from '../specification';
import FallbackVisitor from './FallbackVisitor';

/**
 * This is a base Type for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
export interface SpecificationVisitorOptions extends VisitorOptions {
  readonly specObj: typeof specification;
  readonly openApiGenericElement?: ObjectElement;
  readonly openApiSemanticElement?: OpenApi3_0Element;
}

class SpecificationVisitor extends Visitor {
  public readonly specObj: typeof specification;

  public readonly passingOptionsNames = [
    'specObj',
    'openApiGenericElement',
    'openApiSemanticElement',
  ];

  public openApiGenericElement?: ObjectElement;

  public openApiSemanticElement?: OpenApi3_0Element;

  constructor({
    specObj,
    openApiGenericElement,
    openApiSemanticElement,
    ...rest
  }: SpecificationVisitorOptions) {
    super({ ...rest });
    this.specObj = specObj;
    this.openApiGenericElement = openApiGenericElement;
    this.openApiSemanticElement = openApiSemanticElement;
  }

  retrievePassingOptions() {
    return pick(this.passingOptionsNames as (keyof this)[], this) as unknown as string[];
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

    return new VisitorClz(visitorOpts);
  }

  toRefractedElement(specPath: string[], element: any, options = {}) {
    /**
     * This is `Visitor shortcut`: mechanism for short-circuiting the traversal and replacing
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

    visit(element, visitor, options);
    return visitor.element;
  }
}

export default SpecificationVisitor;
