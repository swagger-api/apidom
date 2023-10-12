import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import HeadersElement from '../../../../elements/Headers';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Header']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new HeadersElement();
  },
});

export default HeadersVisitor;
