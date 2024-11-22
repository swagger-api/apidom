import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import OAuthFlowScopesElement from '../../../../elements/nces/OAuthFlowScopes.ts';

/**
 * @public
 */
export interface ScopesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ScopesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: OAuthFlowScopesElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: ScopesVisitorOptions) {
    super(options);
    this.element = new OAuthFlowScopesElement();
    this.specPath = always(['value']);
  }
}

export default ScopesVisitor;
