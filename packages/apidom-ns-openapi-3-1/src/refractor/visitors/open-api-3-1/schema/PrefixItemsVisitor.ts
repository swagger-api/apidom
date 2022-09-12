import stampit from 'stampit';
import { ArrayElement, Element, isObjectElement, BREAK } from '@swagger-api/apidom-core';
import { FallbackVisitor, SpecificationVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const PrefixItemsVisitor = stampit(
  SpecificationVisitor,
  ParentSchemaAwareVisitor,
  FallbackVisitor,
  {
    init() {
      this.element = new ArrayElement();
      this.element.classes.push('json-schema-prefixItems');
    },
    methods: {
      ArrayElement(arrayElement: ArrayElement) {
        arrayElement.forEach((item: Element): void => {
          if (isObjectElement(item)) {
            const schemaElement = this.toRefractedElement(['document', 'objects', 'Schema'], item);
            this.element.push(schemaElement);
          } else {
            const element = item.clone();
            this.element.push(element);
          }
        });

        this.copyMetaAndAttributes(arrayElement, this.element);

        return BREAK;
      },
    },
  },
);

export default PrefixItemsVisitor;
