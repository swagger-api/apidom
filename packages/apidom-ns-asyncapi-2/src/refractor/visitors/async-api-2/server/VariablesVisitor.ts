import stampit from 'stampit';
import { always } from 'ramda';

import ServerVariablesElement from '../../../../elements/nces/ServerVariables';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const VariablesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new ServerVariablesElement();
  },
});

export default VariablesVisitor;
