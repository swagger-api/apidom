import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import WorkflowsElement from '../../../elements/nces/Workflows';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

class WorkflowsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: WorkflowsElement;

  constructor(options = {}) {
    super(options);
    this.element = new WorkflowsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Workflow'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default WorkflowsVisitor;
