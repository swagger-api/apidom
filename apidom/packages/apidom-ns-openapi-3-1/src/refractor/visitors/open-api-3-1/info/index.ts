import stampit from 'stampit';
import { always } from 'ramda';

import InfoElement from '../../../../elements/Info';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const InfoVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Info']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new InfoElement();
  },
});

export default InfoVisitor;
