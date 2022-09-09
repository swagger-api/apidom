import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import { isTagLikeElement, TagsElement } from '@swagger-api/apidom-ns-openapi-3-0';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const TagsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new TagsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        const specPath = isTagLikeElement(item) ? ['document', 'objects', 'Tag'] : ['value'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default TagsVisitor;
