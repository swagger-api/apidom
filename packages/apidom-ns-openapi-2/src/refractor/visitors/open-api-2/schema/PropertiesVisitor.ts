import stampit from 'stampit';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as JSONSchemaDraft4Specification,
  JSONReferenceElement,
  isJSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

const { properties: JSONSchemaPropertiesVisitor } =
  JSONSchemaDraft4Specification.visitors.document.objects.JSONSchema.fixedFields;

const PropertiesVisitor = stampit(JSONSchemaPropertiesVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = JSONSchemaPropertiesVisitor.compose.methods.ObjectElement.call(
        this,
        objectElement,
      );

      this.element
        .filter(isJSONReferenceElement)
        .forEach((referenceElement: JSONReferenceElement) => {
          referenceElement.setMetaProperty('referenced-element', 'schema');
        });

      return result;
    },
  },
});

export default PropertiesVisitor;
