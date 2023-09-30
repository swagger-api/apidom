import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import RequirementLevelElement from '../../../../elements/RequirementLevel';

const RequirementLevelVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const requirementLevelElement = new RequirementLevelElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, requirementLevelElement);

      this.element = requirementLevelElement;
      return BREAK;
    },
  },
});

export default RequirementLevelVisitor;
