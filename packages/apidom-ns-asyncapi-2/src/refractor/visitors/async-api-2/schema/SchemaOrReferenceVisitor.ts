import { Element } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import { isReferenceElement } from '../../../../predicates';

const { JSONSchemaOrJSONReferenceVisitor } = JSONSchemaDraft7Specification.visitors;

const SchemaOrReferenceVisitor = JSONSchemaOrJSONReferenceVisitor.compose({
  methods: {
    enter(element: Element) {
      // @ts-ignore
      const result = JSONSchemaOrJSONReferenceVisitor.compose.methods.enter.call(this, element);

      if (isReferenceElement(this.element)) {
        this.element.setMetaProperty('referenced-element', 'schema');
      }

      return result;
    },
  },
});

export default SchemaOrReferenceVisitor;
