import { Mixin } from 'ts-mixer';
import { ObjectElement, ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import ParentSchemaAwareVisitor, {
  ParentSchemaAwareVisitorOptions,
} from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

export interface ItemsVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

class ItemsVisitor extends Mixin(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  public declare element: ArrayElement | ObjectElement;

  ObjectElement(objectElement: ObjectElement) {
    const specPath = isJSONReferenceLikeElement(objectElement)
      ? ['document', 'objects', 'JSONReference']
      : ['document', 'objects', 'JSONSchema'];
    this.element = this.toRefractedElement(specPath, objectElement);

    return BREAK;
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-items');

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

export default ItemsVisitor;
