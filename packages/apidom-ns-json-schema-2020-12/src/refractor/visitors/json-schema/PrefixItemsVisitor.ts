import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import {
  SpecificationVisitor,
  SpecificationVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2019-09';

/**
 * @public
 */
export interface PrefixItemsVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PrefixItemsVisitor extends Mixin(
  SpecificationVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
) {
  declare public readonly element: ArrayElement;

  constructor(options: PrefixItemsVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-prefixItems');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default PrefixItemsVisitor;
