import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface SecurityRequirementVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

class SecurityRequirementVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: SecurityRequirementElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: SecurityRequirementVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
    this.specPath = always(['value']);
  }
}

export default SecurityRequirementVisitor;
