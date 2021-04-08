import stampit from 'stampit';
import { ArrayElement, Element, isObjectElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import { appendMetadata } from '../../../metadata';

const PrefixItemsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        if (isObjectElement(item)) {
          const schemaElement = this.toRefractedElement(['document', 'objects', 'Schema'], item);
          this.element.push(schemaElement);
        } else {
          const element = item.clone();
          this.element.push(element);
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      appendMetadata(['json-schema-prefixItems'], this.element);

      return BREAK;
    },
  },
});

export default PrefixItemsVisitor;
