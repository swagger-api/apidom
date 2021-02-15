import stampit from 'stampit';
import { ArrayElement, Element } from 'apidom';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';
import { BREAK } from '../../../../traversal/visitor';
import { isSecurityRequirementLikeElement } from '../../../predicates';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    array(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        if (isSecurityRequirementLikeElement(item)) {
          const serverElement = this.toRefractedElement(
            ['document', 'objects', 'SecurityRequirement'],
            item,
          );
          this.element.push(serverElement);
        } else {
          this.element.push(item);
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      appendMetadata(['security'], this.element);

      return BREAK;
    },
  },
});

export default SecurityVisitor;
