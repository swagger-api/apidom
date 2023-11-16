import stampit from 'stampit';
import { always } from 'ramda';

import SourceDescriptionElement from '../../../../elements/SourceDescription';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const SourceDescriptionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'SourceDescription']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new SourceDescriptionElement();
  },
});

export default SourceDescriptionVisitor;
