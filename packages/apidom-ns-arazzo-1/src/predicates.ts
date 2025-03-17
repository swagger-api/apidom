import { createPredicate } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import ArazzoSpecification1Element from './elements/ArazzoSpecification1.ts';
import ArazzoSpecElement from './elements/ArazzoSpec.ts';
import InfoElement from './elements/Info.ts';
import SourceDescriptionElement from './elements/SourceDescription.ts';
import WorkflowElement from './elements/Workflow.ts';
import StepElement from './elements/Step.ts';
import ParameterElement from './elements/Parameter.ts';
import SuccessActionElement from './elements/SuccessAction.ts';
import FailureActionElement from './elements/FailureAction.ts';
import ComponentsElement from './elements/Components.ts';
import CriterionElement from './elements/Criterion.ts';
import ReferenceElement from './elements/Reference.ts';
// NCE types
import WorkflowsElement from './elements/nces/Workflows.ts';
import SourceDescriptionsElement from './elements/nces/SourceDescriptions.ts';
import WorkflowStepsElement from './elements/nces/WorkflowSteps.ts';
import WorkflowOutputsElement from './elements/nces/WorkflowOutputs.ts';
import StepParametersElement from './elements/nces/StepParameters.ts';
import StepDependsOnElement from './elements/nces/StepDependsOn.ts';
import StepSuccessCriteriaElement from './elements/nces/StepSuccessCriteria.ts';
import StepOnSuccessElement from './elements/nces/StepOnSuccess.ts';
import StepOnFailureElement from './elements/nces/StepOnFailure.ts';
import StepOutputsElement from './elements/nces/StepOutputs.ts';
import SuccessActionCriteriaElement from './elements/nces/SuccessActionCriteria.ts';
import FailureActionCriteriaElement from './elements/nces/FailureActionCriteria.ts';

export { isJSONSchemaElement };

/**
 * @public
 */
export const isArazzoSpecElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ArazzoSpecElement =>
      element instanceof ArazzoSpecElement ||
      (hasBasicElementProps(element) &&
        isElementType('arazzoSpec', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
export const isArazzoSpecification1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is ArazzoSpecification1Element =>
      element instanceof ArazzoSpecification1Element ||
      (hasBasicElementProps(element) &&
        isElementType('arazzoSpecification1', element) &&
        primitiveEq('object', element) &&
        hasClass('api', element) &&
        hasClass('arazzo', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
export const isSourceDescriptionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SourceDescriptionElement =>
      element instanceof SourceDescriptionElement ||
      (hasBasicElementProps(element) &&
        isElementType('sourceDescription', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
export const isWorkflowsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    return (element: unknown): element is WorkflowsElement =>
      element instanceof WorkflowsElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflows', element) &&
        primitiveEq('array', element) &&
        hasClass('workflows', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
export const isWorkflowElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is WorkflowElement =>
      element instanceof WorkflowElement ||
      (hasBasicElementProps(element) &&
        isElementType('workflow', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
export const isStepElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is StepElement =>
      element instanceof StepElement ||
      (hasBasicElementProps(element) &&
        isElementType('step', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParameterElement =>
      element instanceof ParameterElement ||
      (hasBasicElementProps(element) &&
        isElementType('parameter', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isSuccessActionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is SuccessActionElement =>
      element instanceof SuccessActionElement ||
      (hasBasicElementProps(element) &&
        isElementType('successAction', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ComponentsElement =>
      element instanceof ComponentsElement ||
      (hasBasicElementProps(element) &&
        isElementType('components', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isCriterionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is CriterionElement =>
      element instanceof CriterionElement ||
      (hasBasicElementProps(element) &&
        isElementType('criterion', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ReferenceElement =>
      element instanceof ReferenceElement ||
      (hasBasicElementProps(element) &&
        isElementType('reference', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
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

/**
 * @public
 */
export const isFailureActionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is FailureActionElement =>
      element instanceof FailureActionElement ||
      (hasBasicElementProps(element) &&
        isElementType('failureAction', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
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
