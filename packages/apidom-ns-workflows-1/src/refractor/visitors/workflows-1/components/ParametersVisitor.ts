import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';

/**
 * @public
 */
export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsParametersElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ComponentsParametersElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
  }
}

export default ParametersVisitor;
