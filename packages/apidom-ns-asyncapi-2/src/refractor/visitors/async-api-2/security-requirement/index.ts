import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import SecurityRequirementElement from '../../../../elements/SecurityRequirement.ts';

/**
 * @public
 */
export interface SecurityRequirementVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityRequirementVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: SecurityRequirementElement;

  declare protected readonly specPath: SpecPath<['value']>;

  constructor(options: SecurityRequirementVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
    this.specPath = always(['value']);
  }
}

export default SecurityRequirementVisitor;
