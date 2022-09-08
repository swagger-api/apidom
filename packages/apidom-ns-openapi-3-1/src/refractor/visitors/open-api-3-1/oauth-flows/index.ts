import stampit from 'stampit';
import { always } from 'ramda';
import { OAuthFlowsElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const OAuthFlowsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OAuthFlows']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OAuthFlowsElement();
  },
});

export default OAuthFlowsVisitor;
