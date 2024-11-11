import { Mixin } from 'ts-mixer';
import { StringElement, BREAK, toValue } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import WorkflowsSpecElement from '../../../elements/WorkflowsSpec.ts';

export interface WorkflowsSpecVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

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
