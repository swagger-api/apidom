import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isTagLikeElement } from '../../predicates';

const TagsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        const specPath = isTagLikeElement(item) ? ['document', 'objects', 'Tag'] : ['value'];
        const element = this.toRefractedElement(specPath);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      this.element.classes.push('tags');

      return BREAK;
    },
  },
});

export default TagsVisitor;
