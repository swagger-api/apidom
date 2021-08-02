import stampit from 'stampit';
import { always } from 'ramda';

import OperationTraitElement from '../../../../elements/OperationTrait';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const OperationTraitVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OperationTrait']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new OperationTraitElement();
  },
});

export default OperationTraitVisitor;
