import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ScopesElement from '../../../../elements/Scopes.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ScopesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ScopesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ScopesElement;

  declare protected readonly specPath: SpecPath<['value']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ScopesVisitorOptions) {
    super(options);
    this.element = new ScopesElement();
    this.specPath = always(['value']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ScopesVisitor;
