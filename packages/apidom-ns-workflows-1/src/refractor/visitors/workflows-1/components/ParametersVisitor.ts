import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor, { SpecPath } from '../../generics/MapVisitor';

class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsParametersElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  constructor(options = {}) {
    super(options);
    this.element = new ComponentsParametersElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
  }
}

export default ParametersVisitor;
