import stampit from 'stampit';
import { always } from 'ramda';

import ComponentsInputsElement from '../../../../elements/nces/ComponentsInputs';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const InputsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'JSONSchema']),
  },
  init() {
    this.element = new ComponentsInputsElement();
  },
});

export default InputsVisitor;
