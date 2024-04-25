import { Element } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  SchemaOrReferenceVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import { isReferenceElement } from '../../../../predicates';
import SchemaElement from '../../../../elements/Schema';
import JSONReferenceElement from '../../../../elements/Reference';

export type { SchemaOrReferenceVisitorOptions };

const { JSONSchemaOrJSONReferenceVisitor } = JSONSchemaDraft7Specification.visitors;

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
