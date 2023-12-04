import { createPredicate } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import WorkflowElement from './elements/Workflow';
import StepElement from './elements/Step';
import ParameterElement from './elements/Parameter';
import SuccessActionElement from './elements/SuccessAction';
import FailureActionElement from './elements/FailureAction';
import ComponentsElement from './elements/Components';
import CriterionElement from './elements/Criterion';
import ReferenceElement from './elements/Reference';
import JSONSchemaElement from './elements/JSONSchema';
// NCE types
import WorkflowsElement from './elements/nces/Workflows';
import SourceDescriptionsElement from './elements/nces/SourceDescriptions';
import WorkflowStepsElement from './elements/nces/WorkflowSteps';
import WorkflowOutputsElement from './elements/nces/WorkflowOutputs';
import StepParametersElement from './elements/nces/StepParameters';
import StepDependsOnElement from './elements/nces/StepDependsOn';
import StepSuccessCriteriaElement from './elements/nces/StepSuccessCriteria';
import StepOnSuccessElement from './elements/nces/StepOnSuccess';
import StepOnFailureElement from './elements/nces/StepOnFailure';
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

export const isWorkflowsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowWorkflowsElement =>
      element instanceof WorkflowWorkflowsElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflows', element) &&
        primitiveEq('array', element) &&
        hasClass('workflows', element));
  },
);

export const isWorkflowStepsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowStepsElement =>
      element instanceof WorkflowStepsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('workflow-steps', element));
  },
);

export const isWorkflowOutputsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowOutputsElement =>
      element instanceof WorkflowOutputsElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('workflow-outputs', element));
  },
);

export const isWorkflowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is WorkflowElement =>
      element instanceof WorkflowElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflow', element) &&
        primitiveEq('object', element));
  },
);

export const isStepOnSuccessElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepOnSuccessElement =>
      element instanceof StepOnSuccessElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-on-success', element));
  },
);

export const isStepOnFailureElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepOnFailureElement =>
      element instanceof StepOnFailureElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-on-failure', element));
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

export const isStepDependsOnElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is StepDependsOnElement =>
      element instanceof StepDependsOnElement ||
      (hasBasicElementProps(element) &&
        isElementType('array', element) &&
        primitiveEq('array', element) &&
        hasClass('step-depends-on', element));
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
