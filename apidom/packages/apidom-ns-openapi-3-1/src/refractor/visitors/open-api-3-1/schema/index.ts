import stampit from 'stampit';
import { ObjectElement } from 'apidom';

import SchemaElement from '../../../../elements/Schema';
import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import { BREAK } from '../../../../traversal/visitor';

const SchemaVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    Object(objectElement: ObjectElement) {
      // @ts-ignore
      const schemaElement = new SchemaElement(objectElement.content);

      this.copyMetaAndAttributes(objectElement, schemaElement);

      this.element = schemaElement;
      return BREAK;
    },
  },
});

export default SchemaVisitor;
