import stampit from 'stampit';
import { always } from 'ramda';

import DiscriminatorElement from '../../../../elements/Discriminator';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const DiscriminatorVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Discriminator']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new DiscriminatorElement();
  },
});

export default DiscriminatorVisitor;
