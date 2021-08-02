import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isSecurityRequirementLikeElement } from '../../../predicates';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
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
      this.element.classes.push('server-security');

      return BREAK;
    },
  },
});

export default SecurityVisitor;
