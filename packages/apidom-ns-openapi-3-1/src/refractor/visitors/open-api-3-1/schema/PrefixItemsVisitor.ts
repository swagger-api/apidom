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
} from './ParentSchemaAwareVisitor';

export interface PrefixItemsVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

class PrefixItemsVisitor extends Mixin(
  SpecificationVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
) {
  public declare readonly element: ArrayElement;

  constructor(options: PrefixItemsVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-prefixItems');
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

export default PrefixItemsVisitor;
