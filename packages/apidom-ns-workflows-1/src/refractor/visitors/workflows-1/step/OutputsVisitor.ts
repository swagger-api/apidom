import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import StepOutputsElement from '../../../../elements/nces/StepOutputs';

const OutputsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new StepOutputsElement();
  },
});

export default OutputsVisitor;
