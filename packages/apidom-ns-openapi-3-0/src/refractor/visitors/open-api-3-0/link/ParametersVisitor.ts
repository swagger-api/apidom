import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import LinkParametersElement from '../../../../elements/nces/LinkParameters';

class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: LinkParametersElement;

  public declare readonly specPath: SpecPath<['value']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new LinkParametersElement();
    this.specPath = always(['value']);
  }
}

export default ParametersVisitor;
