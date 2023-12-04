import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import WorkflowOutputsElement from '../../../../elements/nces/WorkflowOutputs';

const OutputsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new WorkflowOutputsElement();
  },
});

export default OutputsVisitor;
