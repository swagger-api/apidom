import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

export interface OneOfVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

class OneOfVisitor extends Mixin(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare readonly element: ArrayElement;

  constructor(options: OneOfVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-oneOf');
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

export default OneOfVisitor;
