import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import WorkflowsSpecification1Element from '../../../elements/WorkflowsSpecification1';

class WorkflowsSpecificationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: WorkflowsSpecification1Element;

  constructor(options = {}) {
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
