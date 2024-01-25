import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SecurityRequirementVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: SecurityRequirementElement;

  protected declare readonly specPath: SpecPath<['value']>;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
    this.specPath = always(['value']);
  }
}

export default SecurityRequirementVisitor;
