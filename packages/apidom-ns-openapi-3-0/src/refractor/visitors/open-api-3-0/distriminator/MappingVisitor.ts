import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import DiscriminatorMappingElement from '../../../../elements/nces/DiscriminatorMapping';

export interface MappingVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class MappingVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: DiscriminatorMappingElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: MappingVisitorOptions) {
    super(options);
    this.element = new DiscriminatorMappingElement();
    this.specPath = always(['value']);
  }
}

export default MappingVisitor;
