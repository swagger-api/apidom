import { ObjectElement } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

const { dependencies: JSONSchemaDependenciesVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

const DependenciesVisitor = JSONSchemaDependenciesVisitor.compose({
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaDependenciesVisitor.compose.methods.ObjectElement.call(
        this,
        objectElement,
      );

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

      return result;
    },
  },
});

export default DependenciesVisitor;
