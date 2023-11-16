import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SourceDescriptionsElement from '../../../elements/nces/SourceDescriptions';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isSourceDescriptionLikeElement } from '../../predicates';

const SourceDescriptionsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new SourceDescriptionsElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        const specPath = isSourceDescriptionLikeElement(item)
          ? ['document', 'objects', 'SourceDescription']
          : ['value'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default SourceDescriptionsVisitor;
