import stampit from 'stampit';
import { always } from 'ramda';
import { ServerElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ServerVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ServerElement();
  },
});

export default ServerVisitor;
