import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import WorkflowOutputsElement from '../../../../elements/nces/WorkflowOutputs';

class OutputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: WorkflowOutputsElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new WorkflowOutputsElement();
    this.specPath = always(['value']);
  }
}

export default OutputsVisitor;
