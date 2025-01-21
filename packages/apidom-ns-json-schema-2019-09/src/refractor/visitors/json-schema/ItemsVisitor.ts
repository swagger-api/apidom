import { Mixin } from 'ts-mixer';
import {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  Element,
  BREAK,
} from '@swagger-api/apidom-core';
import {
  SpecificationVisitor,
  SpecificationVisitorOptions,
  FallbackVisitor,
  FallbackVisitorOptions,
  ParentSchemaAwareVisitor,
  ParentSchemaAwareVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

/**
 * @public
 */
export interface ItemsVisitorOptions
  extends SpecificationVisitorOptions,
    ParentSchemaAwareVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ItemsVisitor extends Mixin(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor) {
  declare public element: ObjectElement | ArrayElement;

  ObjectElement(objectElement: ObjectElement) {
    this.element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], objectElement);

    return BREAK;
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-items');

    arrayElement.forEach((item: Element): void => {
      const element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }

  BooleanElement(booleanElement: BooleanElement) {
    this.element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], booleanElement);

    return BREAK;
  }
}

export default ItemsVisitor;
