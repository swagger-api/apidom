import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import WorkflowOutputsElement from '../../../../elements/nces/WorkflowOutputs';

export interface OutputsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class OutputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: WorkflowOutputsElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: OutputsVisitorOptions) {
    super(options);
    this.element = new WorkflowOutputsElement();
    this.specPath = always(['value']);
  }
}

export default OutputsVisitor;
