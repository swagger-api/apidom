import stampit from 'stampit';
import { ArrayElement, Element, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor, SpecificationVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const AnyOfVisitor = stampit(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-anyOf');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        if (isObjectElement(item)) {
          const schemaElement = this.toRefractedElement(['document', 'objects', 'Schema'], item);
          this.element.push(schemaElement);
        } else {
          const element = cloneDeep(item);
          this.element.push(element);
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default AnyOfVisitor;
