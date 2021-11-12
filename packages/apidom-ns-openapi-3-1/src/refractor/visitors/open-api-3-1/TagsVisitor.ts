import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import TagsElement from '../../../elements/nces/Tags';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isTagLikeElement } from '../../predicates';

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
