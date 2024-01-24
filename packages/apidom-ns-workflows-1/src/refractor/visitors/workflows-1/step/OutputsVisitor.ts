import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import StepOutputsElement from '../../../../elements/nces/StepOutputs';

class OutputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: StepOutputsElement;

  constructor(options = {}) {
    super(options);
    this.element = new StepOutputsElement();
    this.specPath = always(['value']);
  }
}

export default OutputsVisitor;
