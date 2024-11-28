import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityDefinitionsElement from '../../../../elements/SecurityDefinitions.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface SecurityDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: SecurityDefinitionsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  constructor(options: SecurityDefinitionsVisitorOptions) {
    super(options);
    this.element = new SecurityDefinitionsElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
  }
}

export default SecurityDefinitionsVisitor;
