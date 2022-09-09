import stampit from 'stampit';
import { always } from 'ramda';

import OAuthFlowElement from '../../../../elements/OAuthFlow';
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
