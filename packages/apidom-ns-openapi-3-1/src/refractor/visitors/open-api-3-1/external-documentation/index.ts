import stampit from 'stampit';
import { always } from 'ramda';
import { ExternalDocumentationElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ExternalDocumentationVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ExternalDocumentation']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ExternalDocumentationElement();
  },
});

export default ExternalDocumentationVisitor;
