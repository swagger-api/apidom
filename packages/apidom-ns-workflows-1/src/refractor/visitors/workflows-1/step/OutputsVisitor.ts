import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import StepOutputsElement from '../../../../elements/nces/StepOutputs.ts';

/**
 * @public
 */
export interface OutputsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
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
