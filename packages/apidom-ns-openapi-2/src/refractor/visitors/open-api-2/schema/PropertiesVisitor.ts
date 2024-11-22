import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  isJSONReferenceElement,
  PropertiesVisitorOptions,
  PropertiesVisitor as PropertiesVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

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

    this.element
      .filter(isJSONReferenceElement)
      // @ts-ignore
      .forEach((referenceElement: JSONReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

    return result;
  }
}

export default PropertiesVisitor;
