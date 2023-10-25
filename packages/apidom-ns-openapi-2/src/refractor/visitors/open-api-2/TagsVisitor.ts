import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SwaggerTagsElement from '../../../elements/nces/SwaggerTags';
import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';

const TagsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new SwaggerTagsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'Tag'];
        const element = this.toRefractedElement(specPath, item);
        this.element.push(element);
      });
      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default TagsVisitor;
