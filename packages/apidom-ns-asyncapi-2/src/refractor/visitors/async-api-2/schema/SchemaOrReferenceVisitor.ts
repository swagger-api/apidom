import { Element } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  SchemaOrReferenceVisitorOptions,
  SchemaOrReferenceVisitor as SchemaOrReferenceVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import { isReferenceElement } from '../../../../predicates.ts';
import SchemaElement from '../../../../elements/Schema.ts';
import JSONReferenceElement from '../../../../elements/Reference.ts';

export type { SchemaOrReferenceVisitorOptions };

/**
 * @public
 */
// eslint-disable-next-line prefer-destructuring
export const JSONSchemaOrJSONReferenceVisitor: typeof SchemaOrReferenceVisitorType =
  JSONSchemaDraft7Specification.visitors.JSONSchemaOrJSONReferenceVisitor;

/**
 * @public
 */
class SchemaOrReferenceVisitor extends JSONSchemaOrJSONReferenceVisitor {
  public declare element: SchemaElement | JSONReferenceElement;

  enter(element: Element) {
    const result = JSONSchemaOrJSONReferenceVisitor.prototype.enter.call(this, element);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }
}

export default SchemaOrReferenceVisitor;
