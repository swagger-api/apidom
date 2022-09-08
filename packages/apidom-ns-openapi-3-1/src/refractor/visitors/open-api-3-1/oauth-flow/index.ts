import stampit from 'stampit';
import { always } from 'ramda';
import { OAuthFlowElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const OAuthFlowVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OAuthFlow']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OAuthFlowElement();
  },
});

export default OAuthFlowVisitor;
