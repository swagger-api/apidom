import { ArrayElement } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

const { anyOf: JSONSchemaAnyOfVisitor } =
  JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema.fixedFields;

const AnyOfVisitor = JSONSchemaAnyOfVisitor.compose({
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      // @ts-ignore
      const result = JSONSchemaAnyOfVisitor.compose.methods.ArrayElement.call(this, arrayElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'schema');
      });

      return result;
    },
  },
});

export default AnyOfVisitor;
