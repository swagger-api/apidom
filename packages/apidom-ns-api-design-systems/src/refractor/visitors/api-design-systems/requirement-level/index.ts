import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import RequirementLevelElement from '../../../../elements/RequirementLevel.ts';

/**
 * @public
 */
export interface RequirementLevelVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RequirementLevelVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public element: RequirementLevelElement;

  StringElement(stringElement: StringElement) {
    const requirementLevelElement = new RequirementLevelElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, requirementLevelElement);

    this.element = requirementLevelElement;
    return BREAK;
  }
}

export default RequirementLevelVisitor;
