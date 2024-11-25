import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import WorkflowElement from '../../../../elements/Workflow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface WorkflowVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class WorkflowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: WorkflowElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Workflow']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: WorkflowVisitorOptions) {
    super(options);
    this.element = new WorkflowElement();
    this.specPath = always(['document', 'objects', 'Workflow']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default WorkflowVisitor;
