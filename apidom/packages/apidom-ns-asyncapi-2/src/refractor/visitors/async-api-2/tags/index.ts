import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import TagsElement from '../../../../elements/Tags';
import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const TagsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new TagsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        const tagElement = this.toRefractedElement(['document', 'objects', 'Tag'], item);
        this.element.push(tagElement);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default TagsVisitor;
