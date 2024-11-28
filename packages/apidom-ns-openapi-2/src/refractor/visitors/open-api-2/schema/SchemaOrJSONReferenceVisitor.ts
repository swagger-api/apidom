import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  isJSONReferenceElement,
  JSONReferenceElement,
  SchemaOrReferenceVisitorOptions,
  SchemaOrReferenceVisitor as SchemaOrReferenceVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import SchemaElement from '../../../../elements/Schema.ts';

export type { SchemaOrReferenceVisitorOptions };

/**
 * @public
 */
// eslint-disable-next-line prefer-destructuring
export const JSONSchemaOrJSONReferenceVisitor: typeof SchemaOrReferenceVisitorType =
  JSONSchemaDraft4Specification.visitors.JSONSchemaOrJSONReferenceVisitor;

/**
 * @public
 */
class SchemaOrJSONReferenceVisitor extends JSONSchemaOrJSONReferenceVisitor {
  declare public element: SchemaElement | JSONReferenceElement;

  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaOrJSONReferenceVisitor.prototype.enter.call(this, objectElement);

    if (isJSONReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }
}

export default SchemaOrJSONReferenceVisitor;
