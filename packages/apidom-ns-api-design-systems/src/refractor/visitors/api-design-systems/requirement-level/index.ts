import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import RequirementLevelElement from '../../../../elements/RequirementLevel';

class RequirementLevelVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  StringElement(stringElement: StringElement) {
    const requirementLevelElement = new RequirementLevelElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, requirementLevelElement);

    this.element = requirementLevelElement;
    return BREAK;
  }
}

export default RequirementLevelVisitor;
