import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';
import { FallbackVisitor, SpecificationVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

import JsonSchemaDialectElement from '../../../elements/JsonSchemaDialect';

const JsonSchemaDialectVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const jsonSchemaDialectElement = new JsonSchemaDialectElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, jsonSchemaDialectElement);

      this.element = jsonSchemaDialectElement;
      return BREAK;
    },
  },
});

export default JsonSchemaDialectVisitor;
