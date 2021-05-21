import stampit from 'stampit';
import { always } from 'ramda';

import EncodingElement from '../../../../elements/Encoding';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const EncodingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Encoding']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new EncodingElement();
  },
});

export default EncodingVisitor;
