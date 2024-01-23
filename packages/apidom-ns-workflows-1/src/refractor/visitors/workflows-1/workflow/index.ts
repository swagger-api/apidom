import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WorkflowElement from '../../../../elements/Workflow';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class WorkflowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: WorkflowElement;

  constructor(options = {}) {
    super(options);
    this.element = new WorkflowElement();
    this.specPath = always(['document', 'objects', 'Workflow']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default WorkflowVisitor;
