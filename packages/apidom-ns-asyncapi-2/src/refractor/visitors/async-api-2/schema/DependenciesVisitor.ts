import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  DependenciesVisitorOptions,
  DependenciesVisitor as DependenciesVisitorType,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

export type { DependenciesVisitorOptions };

/**
 * @public
 */
export const JSONSchemaDependenciesVisitor: typeof DependenciesVisitorType =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields.dependencies;

/**
 * @public
 */
class DependenciesVisitor extends JSONSchemaDependenciesVisitor {
  ObjectElement(objectElement: ObjectElement) {
    const result = JSONSchemaDependenciesVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'schema');
    });

    return result;
  }
}

export default DependenciesVisitor;
