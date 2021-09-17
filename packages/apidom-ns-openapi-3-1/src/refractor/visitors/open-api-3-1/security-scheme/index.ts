import stampit from 'stampit';
import { always } from 'ramda';

import SecuritySchemeElement from '../../../../elements/SecurityScheme';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const SecuritySchemeVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'SecurityScheme']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new SecuritySchemeElement();
  },
});

export default SecuritySchemeVisitor;
