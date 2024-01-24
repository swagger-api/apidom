import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import WorkflowsSpecElement from '../../../elements/WorkflowsSpec';

class WorkflowsSpecVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare element: WorkflowsSpecElement;

  StringElement(stringElement: StringElement) {
    const workflowsSpecElement = new WorkflowsSpecElement(toValue(stringElement));

    this.copyMetaAndAttributes(stringElement, workflowsSpecElement);
    this.element = workflowsSpecElement;

    return BREAK;
  }
}

export default WorkflowsSpecVisitor;
