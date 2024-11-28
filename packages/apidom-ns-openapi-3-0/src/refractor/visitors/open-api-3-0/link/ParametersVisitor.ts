import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import LinkParametersElement from '../../../../elements/nces/LinkParameters.ts';

/**
 * @public
 */
export interface ParametersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: LinkParametersElement;

  declare protected readonly specPath: SpecPath<['value']>;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new LinkParametersElement();
    this.specPath = always(['value']);
  }
}

export default ParametersVisitor;
