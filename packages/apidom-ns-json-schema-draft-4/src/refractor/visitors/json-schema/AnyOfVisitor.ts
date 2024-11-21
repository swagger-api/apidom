import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';
import { isJSONReferenceLikeElement } from '../../predicates.ts';

/**
 * @public
 */
export interface AnyOfVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AnyOfVisitor extends Mixin(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare readonly element: ArrayElement;

  constructor(options: AnyOfVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-anyOf');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = isJSONReferenceLikeElement(item)
        ? ['document', 'objects', 'JSONReference']
        : ['document', 'objects', 'JSONSchema'];
      const element = this.toRefractedElement(specPath, item);
      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default AnyOfVisitor;
