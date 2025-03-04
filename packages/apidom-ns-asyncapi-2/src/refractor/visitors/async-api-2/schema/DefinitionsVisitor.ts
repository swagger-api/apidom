import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  DefinitionsVisitorOptions,
  DefinitionsVisitor as DefinitionsVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { DefinitionsVisitorOptions };

/**
 * @public
 */
export const JSONSchemaDefinitionsVisitor: typeof DefinitionsVisitorType =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields.definitions;

/**
 * @public
 */
class DefinitionsVisitor extends JSONSchemaDefinitionsVisitor {
  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaDefinitionsVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default DefinitionsVisitor;
