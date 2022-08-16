import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const LinksVisitor = stampit(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-links');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const linkDescriptionElement = this.toRefractedElement(
          ['document', 'objects', 'LinkDescription'],
          item,
        );
        this.element.push(linkDescriptionElement);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default LinksVisitor;
