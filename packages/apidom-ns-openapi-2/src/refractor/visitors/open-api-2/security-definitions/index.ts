import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityDefinitionsElement from '../../../../elements/SecurityDefinitions';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface SecurityDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

class SecurityDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: SecurityDefinitionsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  constructor(options: SecurityDefinitionsVisitorOptions) {
    super(options);
    this.element = new SecurityDefinitionsElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
  }
}

export default SecurityDefinitionsVisitor;
