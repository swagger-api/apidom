import stampit from 'stampit';
import { StringElement, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import JsonSchemaDialectElement from '../../../elements/JsonSchemaDialect';

const JsonSchemaDialectVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const jsonSchemaDialectElement = new JsonSchemaDialectElement(stringElement.toValue());

      this.copyMetaAndAttributes(stringElement, jsonSchemaDialectElement);

      this.element = jsonSchemaDialectElement;
      return BREAK;
    },
  },
});

export default JsonSchemaDialectVisitor;
