import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';
import { isJSONReferenceLikeElement } from '../../predicates';

const OneOfVisitor = stampit(SpecificationVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('json-schema-oneOf');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = isJSONReferenceLikeElement(item)
          ? ['document', 'objects', 'JSONReference']
          : ['document', 'objects', 'JSONSchema'];
        const element = this.toRefractedElement(specPath, item);
        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default OneOfVisitor;
