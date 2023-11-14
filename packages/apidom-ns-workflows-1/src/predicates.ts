import { createPredicate } from '@swagger-api/apidom-core';
// import type { ElementPredicate } from '@swagger-api/apidom-core';

import WorkflowsSpecificationElement from './elements/WorkflowsSpecification';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';

export const isWorkflowsSpecElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is WorkflowsSpecElement =>
      element instanceof WorkflowsSpecElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflowsSpec', element) &&
        primitiveEq('string', element));
  },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const isWorkflowsSpecificationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowsSpecificationElement =>
      element instanceof WorkflowsSpecificationElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflowsSpecification', element) &&
        primitiveEq('object', element) &&
        hasClass('workflow', element));
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is InfoElement =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);
