import stampit from 'stampit';
import { ObjectElement, BREAK } from 'apidom';

import SchemaElement from '../../../../elements/Schema';
import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const SchemaVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const schemaElement = new SchemaElement(objectElement.content);

      this.copyMetaAndAttributes(objectElement, schemaElement);

      this.element = schemaElement;
      return BREAK;
    },
  },
});

export default SchemaVisitor;
