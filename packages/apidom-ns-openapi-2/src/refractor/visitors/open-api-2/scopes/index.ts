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
  public declare readonly element: ScopesElement;

  protected declare readonly specPath: SpecPath<['value']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ScopesVisitorOptions) {
    super(options);
    this.element = new ScopesElement();
    this.specPath = always(['value']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ScopesVisitor;
