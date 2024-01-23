import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import WorkflowOutputsElement from '../../../../elements/nces/WorkflowOutputs';

class OutputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: WorkflowOutputsElement;

  constructor(options = {}) {
    super(options);
    this.element = new WorkflowOutputsElement();
    this.specPath = always(['value']);
  }
}

export default OutputsVisitor;
