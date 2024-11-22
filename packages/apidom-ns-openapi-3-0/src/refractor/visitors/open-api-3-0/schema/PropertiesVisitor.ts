import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  PropertiesVisitorOptions,
  PropertiesVisitor as PropertiesVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { PropertiesVisitorOptions };

/**
 * @public
 */
export const JSONSchemaPropertiesVisitor: typeof PropertiesVisitorType =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields.properties;

/**
 * @public
 */
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
