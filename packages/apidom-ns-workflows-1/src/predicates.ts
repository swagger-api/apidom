import { createPredicate } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import CriterionElement from './elements/Criterion';
// NCE types
import SourceDescriptionsElement from './elements/nces/SourceDescriptions';

export const isWorkflowsSpecElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is WorkflowsSpecElement =>
      element instanceof WorkflowsSpecElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflowsSpec', element) &&
        primitiveEq('string', element));
  },
);

export const isWorkflowsSpecification1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowsSpecification1Element =>
      element instanceof WorkflowsSpecification1Element ||
      (hasBasicElementProps(element) &&
        isElementType('workflowsSpecification1', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element) &&
        hasClass('workflow', element));
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is InfoElement =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element) &&
        hasClass('info', element));
  },
);

export const isSourceDescriptionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SourceDescriptionElement =>
      element instanceof SourceDescriptionElement ||
      (hasBasicElementProps(element) &&
        isElementType('sourceDescription', element) &&
        primitiveEq('object', element));
  },
);

export const isSourceDescriptionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SourceDescriptionsElement =>
      element instanceof SourceDescriptionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('sourceDescriptions', element));
  },
);

export const isCriterionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is CriterionElement =>
      element instanceof CriterionElement ||
      (hasBasicElementProps(element) &&
        isElementType('criterion', element) &&
        primitiveEq('object', element) &&
        hasClass('criterion', element));
  },
);
