import stampit from 'stampit';
import { always } from 'ramda';
import { XmlElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const XmlVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'XML']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new XmlElement();
  },
});

export default XmlVisitor;
