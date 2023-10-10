import stampit from 'stampit';
import { always } from 'ramda';

import ItemsElement from '../../../../elements/Items';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ItemsVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Items']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ItemsElement();
  },
});

export default ItemsVisitor;
