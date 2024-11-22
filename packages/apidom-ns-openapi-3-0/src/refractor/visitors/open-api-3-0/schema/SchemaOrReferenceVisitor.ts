import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  SchemaOrReferenceVisitorOptions,
  SchemaOrReferenceVisitor as JSONSchemaOrJSONReferenceVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import { isReferenceElement } from '../../../../predicates.ts';
import SchemaElement from '../../../../elements/Schema.ts';

export type { SchemaOrReferenceVisitorOptions };

/**
 * @public
 */
// eslint-disable-next-line prefer-destructuring
export const JSONSchemaOrJSONReferenceVisitor: typeof JSONSchemaOrJSONReferenceVisitorType =
  JSONSchemaDraft4Specification.visitors.JSONSchemaOrJSONReferenceVisitor;

/**
 * @public
 */
class SchemaOrReferenceVisitor extends JSONSchemaOrJSONReferenceVisitor {
  public declare element: SchemaElement | JSONReferenceElement;

  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaOrJSONReferenceVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }
}

export default SchemaOrReferenceVisitor;
