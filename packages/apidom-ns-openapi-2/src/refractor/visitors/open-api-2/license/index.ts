import stampit from 'stampit';
import { always } from 'ramda';

import LicenseElement from '../../../../elements/License';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const LicenseVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'License']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new LicenseElement();
  },
});

export default LicenseVisitor;
