import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import DiscriminatorMappingElement from '../../../../elements/nces/DiscriminatorMapping';

class MappingVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: DiscriminatorMappingElement;

  public declare readonly specPath: SpecPath<['value']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new DiscriminatorMappingElement();
    this.specPath = always(['value']);
  }
}

export default MappingVisitor;
