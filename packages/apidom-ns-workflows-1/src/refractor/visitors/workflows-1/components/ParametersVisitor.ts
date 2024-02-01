import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';

export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsParametersElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ComponentsParametersElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
  }
}

export default ParametersVisitor;
