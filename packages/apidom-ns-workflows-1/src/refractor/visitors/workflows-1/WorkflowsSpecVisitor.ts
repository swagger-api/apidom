import stampit from 'stampit';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import WorkflowsSpecElement from '../../../elements/WorkflowsSpec';

const WorkflowsSpecVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  methods: {
    StringElement(stringElement: StringElement) {
      const workflowsSpecElement = new WorkflowsSpecElement(toValue(stringElement));

      this.copyMetaAndAttributes(stringElement, workflowsSpecElement);

      this.element = workflowsSpecElement;
      return BREAK;
    },
  },
});

export default WorkflowsSpecVisitor;
