import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  PropertiesVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

export type { PropertiesVisitorOptions };

const { properties: JSONSchemaPropertiesVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

class PropertiesVisitor extends JSONSchemaPropertiesVisitor {
  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaPropertiesVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default PropertiesVisitor;
