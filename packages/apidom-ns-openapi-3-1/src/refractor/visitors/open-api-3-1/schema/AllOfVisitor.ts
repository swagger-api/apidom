import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import {
  FallbackVisitor,
  FallbackVisitorOptions,
  SpecificationVisitor,
  SpecificationVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';

/**
 * @public
 */
export interface AllOfVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AllOfVisitor extends Mixin(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  declare public readonly element: ArrayElement;

  constructor(options: AllOfVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-allOf');
    this.passingOptionsNames.push('parent');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      if (isObjectElement(item)) {
        const schemaElement = this.toRefractedElement(['document', 'objects', 'Schema'], item);
        this.element.push(schemaElement);
      } else {
        const element = cloneDeep(item);
        this.element.push(element);
      }
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default AllOfVisitor;
