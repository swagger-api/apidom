import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuthFlowScopesElement from '../../../../elements/nces/OAuthFlowScopes';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ScopesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: OAuthFlowScopesElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new OAuthFlowScopesElement();
    this.specPath = always(['value']);
  }
}

export default ScopesVisitor;
