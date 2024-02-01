import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import WorkflowsSpecification1Element from '../../../elements/WorkflowsSpecification1';

export interface WorkflowsSpecificationVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}
class WorkflowsSpecificationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: WorkflowsSpecification1Element;

  protected readonly specPath: SpecPath<['document', 'objects', 'WorkflowsSpecification']>;

  protected readonly canSupportSpecificationExtensions: true;

  constructor(options: WorkflowsSpecificationVisitorOptions) {
    super(options);
    this.element = new WorkflowsSpecification1Element();
    this.specPath = always(['document', 'objects', 'WorkflowsSpecification']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    return FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  }
}

export default WorkflowsSpecificationVisitor;
