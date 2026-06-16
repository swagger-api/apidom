import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import SecuritySchemesElement from '../../../elements/nces/SecuritySchemes.ts';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SecuritySchemesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SecuritySchemesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: SecuritySchemesElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'SecurityScheme']>;

  constructor(options: SecuritySchemesVisitorOptions) {
    super(options);
    this.element = new SecuritySchemesElement();
    this.specPath = always(['document', 'objects', 'SecurityScheme']);
  }
}

export default SecuritySchemesVisitor;
