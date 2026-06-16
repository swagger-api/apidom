import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SecurityRequirementSchemesVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityRequirementSchemesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public readonly element: ObjectElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'StringList']>;

  constructor(options: SecurityRequirementSchemesVisitorOptions) {
    super(options);
    this.element = new ObjectElement();
    this.element.classes.push('security-requirement-schemes');
    this.specPath = always(['document', 'objects', 'StringList']);
  }
}

export default SecurityRequirementSchemesVisitor;
