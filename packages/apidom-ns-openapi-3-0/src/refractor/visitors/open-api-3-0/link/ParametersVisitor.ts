import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import LinkParametersElement from '../../../../elements/nces/LinkParameters';

export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: LinkParametersElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new LinkParametersElement();
    this.specPath = always(['value']);
  }
}

export default ParametersVisitor;
