import { BooleanElement, BREAK } from '@swagger-api/apidom-core';
import {
  ItemsVisitor as JSONSchemaDraft4ItemsVisitor,
  ItemsVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

export type { ItemsVisitorOptions };

/**
 * @public
 */
class ItemsVisitor extends JSONSchemaDraft4ItemsVisitor {
  BooleanElement(booleanElement: BooleanElement) {
    this.element = this.toRefractedElement(['document', 'objects', 'JSONSchema'], booleanElement);

    return BREAK;
  }
}

export default ItemsVisitor;
