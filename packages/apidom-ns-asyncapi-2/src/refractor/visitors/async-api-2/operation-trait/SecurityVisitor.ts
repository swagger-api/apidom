import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isSecurityRequirementLikeElement } from '../../../predicates';
import OperationTraitSecurityElement from '../../../../elements/nces/OperationTraitSecurity';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new OperationTraitSecurityElement();
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

      return BREAK;
    },
  },
});

export default SecurityVisitor;
