import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import StepOutputsElement from '../../../../elements/nces/StepOutputs';

export interface OutputsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class OutputsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: StepOutputsElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: OutputsVisitorOptions) {
    super(options);
    this.element = new StepOutputsElement();
    this.specPath = always(['value']);
  }
}

export default OutputsVisitor;
