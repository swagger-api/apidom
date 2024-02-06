import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import RequirementLevelElement from '../../../../elements/RequirementLevel';

export interface RequirementLevelVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class RequirementLevelVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: RequirementLevelElement;

  StringElement(stringElement: StringElement) {
    const requirementLevelElement = new RequirementLevelElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, requirementLevelElement);

    this.element = requirementLevelElement;
    return BREAK;
  }
}

export default RequirementLevelVisitor;
