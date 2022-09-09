import stampit from 'stampit';
import { always } from 'ramda';
import { ServerVariableElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ServerVariableVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ServerVariableElement();
  },
});

export default ServerVariableVisitor;
