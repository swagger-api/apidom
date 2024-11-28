import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import DiscriminatorMappingElement from '../../../../elements/nces/DiscriminatorMapping.ts';

/**
 * @public
 */
export interface MappingVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MappingVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: DiscriminatorMappingElement;

  declare protected readonly specPath: SpecPath<['value']>;

  constructor(options: MappingVisitorOptions) {
    super(options);
    this.element = new DiscriminatorMappingElement();
    this.specPath = always(['value']);
  }
}

export default MappingVisitor;
