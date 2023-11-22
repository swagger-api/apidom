import { createPredicate } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import SuccessActionElement from './elements/SuccessAction';
import FailureActionElement from './elements/FailureAction';
import CriterionElement from './elements/Criterion';
// NCE types
import SourceDescriptionsElement from './elements/nces/SourceDescriptions';
import SuccessActionCriteriaElement from './elements/nces/SuccessActionCriteria';
import FailureActionCriteriaElement from './elements/nces/FailureActionCriteria';

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
        isElementType('sourceDescriptions', element) &&
        primitiveEq('array', element) &&
        hasClass('sourceDescriptions', element));
  },
);

export const isSuccessActionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SuccessActionElement =>
      element instanceof SuccessActionElement ||
      (hasBasicElementProps(element) &&
        isElementType('successAction', element) &&
        primitiveEq('object', element));
  },
);

export const isCriterionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is CriterionElement =>
      element instanceof CriterionElement ||
      (hasBasicElementProps(element) &&
        isElementType('criterion', element) &&
        primitiveEq('object', element));
  },
);

export const isSuccessActionCriteriaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is SuccessActionCriteriaElement =>
      element instanceof SuccessActionCriteriaElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('success-action-criteria', element) &&
        hasClass('criteria', element));
  },
);

export const isFailureActionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is FailureActionElement =>
      element instanceof FailureActionElement ||
      (hasBasicElementProps(element) &&
        isElementType('failureAction', element) &&
        primitiveEq('object', element));
  },
);

export const isFailureActionCriteriaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is FailureActionCriteriaElement =>
      element instanceof FailureActionCriteriaElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('failure-action-criteria', element) &&
        hasClass('criteria', element));
  },
);
