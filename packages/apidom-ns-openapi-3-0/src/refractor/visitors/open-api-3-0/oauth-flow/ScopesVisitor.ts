import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import OAuthFlowScopesElement from '../../../../elements/nces/OAuthFlowScopes';

export interface ScopesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

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
