import stampit from 'stampit';
import { ObjectElement } from '@swagger-api/apidom-core';
import { specificationObj as JSONSchemaDraft4Specification } from '@swagger-api/apidom-ns-json-schema-draft-4';

import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

const { patternProperties: JSONSchemaPatternPropertiesVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const PatternPropertiesVisitor = stampit(JSONSchemaPatternPropertiesVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaPatternPropertiesVisitor.compose.methods.ObjectElement.call(
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

export default PatternPropertiesVisitor;
