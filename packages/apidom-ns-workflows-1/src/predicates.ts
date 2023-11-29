import { createPredicate } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import StepElement from './elements/Step';
import ParameterElement from './elements/Parameter';
import SuccessActionElement from './elements/SuccessAction';
import FailureActionElement from './elements/FailureAction';
import ComponentsElement from './elements/Components';
import CriterionElement from './elements/Criterion';
import ReferenceElement from './elements/Reference';
import JSONSchemaElement from './elements/JSONSchema';
// NCE types
import SourceDescriptionsElement from './elements/nces/SourceDescriptions';
import StepParametersElement from './elements/nces/StepParameters';
import StepDependenciesElement from './elements/nces/StepDependencies';
import StepSuccessCriteriaElement from './elements/nces/StepSuccessCriteria';
import StepSuccessActionsElement from './elements/nces/StepSuccessActions';
import StepFailureActionsElement from './elements/nces/StepFailureActions';
import StepOutputsElement from './elements/nces/StepOutputs';
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

export const isStepSuccessActionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepSuccessActionsElement =>
      element instanceof StepSuccessActionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-success-actions', element));
  },
);

export const isStepFailureActionsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepFailureActionsElement =>
      element instanceof StepFailureActionsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-failure-actions', element));
  },
);

export const isStepOutputsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepOutputsElement =>
      element instanceof StepOutputsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-outputs', element));
  },
);

export const isStepElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is StepElement =>
      element instanceof StepElement ||
      (hasBasicElementProps(element) &&
        isElementType('step', element) &&
        primitiveEq('object', element));
  },
);

export const isStepParametersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepParametersElement =>
      element instanceof StepParametersElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-parameters', element));
  },
);

export const isStepDependenciesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepDependenciesElement =>
      element instanceof StepDependenciesElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-dependencies', element));
  },
);

export const isStepSuccessCriteriaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepSuccessCriteriaElement =>
      element instanceof StepSuccessCriteriaElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-success-criteria', element) &&
        hasClass('criteria', element));
  },
);

export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParameterElement =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
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

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ComponentsElement =>
      element instanceof ComponentsElement ||
      (hasBasicElementProps(element) &&
        isElementType('components', element) &&
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

export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ReferenceElement =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
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

export const isJSONSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is JSONSchemaElement =>
      element instanceof JSONSchemaElement ||
      (hasBasicElementProps(element) &&
        isElementType('jSONSchemaDraft202012', element) &&
        primitiveEq('object', element));
  },
);
