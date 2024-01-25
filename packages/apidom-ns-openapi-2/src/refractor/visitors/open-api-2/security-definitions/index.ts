import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityDefinitionsElement from '../../../../elements/SecurityDefinitions';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SecurityDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: SecurityDefinitionsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new SecurityDefinitionsElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
  }
}

export default SecurityDefinitionsVisitor;
