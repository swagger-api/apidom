import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const AllOfVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-allOf');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = isReferenceLikeElement(item)
          ? ['document', 'objects', 'Reference']
          : ['document', 'objects', 'Schema'];
        const element = this.toRefractedElement(specPath, item);

        if (isReferenceElement(element)) {
          element.setMetaProperty('referenced-element', 'schema');
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default AllOfVisitor;
