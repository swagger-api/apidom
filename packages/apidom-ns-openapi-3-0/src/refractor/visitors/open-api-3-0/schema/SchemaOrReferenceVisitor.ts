import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  SchemaOrReferenceVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import { isReferenceElement } from '../../../../predicates';
import SchemaElement from '../../../../elements/Schema';

export type { SchemaOrReferenceVisitorOptions };

const { JSONSchemaOrJSONReferenceVisitor } = JSONSchemaDraft4Specification.visitors;

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
