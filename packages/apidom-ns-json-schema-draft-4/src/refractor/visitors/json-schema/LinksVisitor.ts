import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor.ts';

/**
 * @public
 */
export interface LinksVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
export const LinksVisitorBase = Mixin(
  SpecificationVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
);

/**
 * @public
 */
class LinksVisitor extends LinksVisitorBase {
  public declare readonly element: ArrayElement;

  constructor(options: LinksVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-links');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const linkDescriptionElement = this.toRefractedElement(
        ['document', 'objects', 'LinkDescription'],
        item,
      );
      this.element.push(linkDescriptionElement);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default LinksVisitor;
