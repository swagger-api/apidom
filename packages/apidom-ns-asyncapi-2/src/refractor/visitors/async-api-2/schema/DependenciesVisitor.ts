import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft7Specification,
  DependenciesVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

export type { DependenciesVisitorOptions };

const { dependencies: JSONSchemaDependenciesVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

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
