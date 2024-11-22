export {
  isRefElement,
  isLinkElement as isLinkPrimitiveElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, WorkflowsMediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element.ts';

export { default as refract, createRefractor } from './refractor/index.ts';
export { default as specificationObj } from './refractor/specification.ts';

export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type {
  FixedFieldsVisitorOptions,
  SpecPath,
} from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor.ts';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor.ts';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/workflows-1/components/index.ts';
export type {
  default as ComponentsInputsVisitor,
  InputsVisitorOptions as ComponentsInputsVisitorOptions,
} from './refractor/visitors/workflows-1/components/InputsVisitor.ts';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/workflows-1/components/ParametersVisitor.ts';
export type {
  default as CriterionVisitor,
  CriterionVisitorOptions,
} from './refractor/visitors/workflows-1/criterion/index.ts';
export type {
  default as FailureVisitor,
  FailureActionVisitorOptions,
} from './refractor/visitors/workflows-1/failure-action/index.ts';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/workflows-1/info/index.ts';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/workflows-1/info/VersionVisitor.ts';
export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
  SchemaVisitor,
} from './refractor/visitors/workflows-1/json-schema/index.ts';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/workflows-1/parameter/index.ts';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/workflows-1/reference/$RefVisitor.ts';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/workflows-1/reference/index.ts';
export type {
  default as SourceDescriptionsVisitor,
  SourceDescriptionVisitorOptions,
} from './refractor/visitors/workflows-1/source-description/index.ts';
export type {
  default as SourceDescriptionsUrlVisitor,
  UrlVisitorOptions as SourceDescriptionsUrlVisitorOptions,
} from './refractor/visitors/workflows-1/source-description/UrlVisitor.ts';
export type {
  default as StepDependsOnVisitor,
  DependsOnVisitorOptions as StepDependsOnVisitorOptions,
} from './refractor/visitors/workflows-1/step/DependsOnVisitor.ts';
export type {
  default as StepsVisitor,
  StepVisitorOptions,
} from './refractor/visitors/workflows-1/step/index.ts';
export type {
  default as StepOnFailureVisitor,
  OnFailureVisitorOptions as StepOnFailureVisitorOptions,
} from './refractor/visitors/workflows-1/step/OnFailureVisitor.ts';
export type {
  default as StepOnSuccessVisitor,
  OnSuccessVisitorOptions as StepOnSuccessVisitorOptions,
} from './refractor/visitors/workflows-1/step/OnSuccessVisitor.ts';
export type {
  default as StepOutputsVisitor,
  OutputsVisitorOptions as StepOutputsVisitorOptions,
} from './refractor/visitors/workflows-1/step/OutputsVisitor.ts';
export type {
  default as StepParametersVisitor,
  ParametersVisitorOptions as StepParametersVisitorOptions,
} from './refractor/visitors/workflows-1/step/ParametersVisitor.ts';
export type {
  default as StepSuccessCriteriaVisitor,
  SuccessCriteriaVisitorOptions as StepSuccessCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/step/SuccessCriteriaVisitor.ts';
export type {
  default as SuccessActionVisitor,
  SuccessActionVisitorOptions,
} from './refractor/visitors/workflows-1/success-action/index.ts';
export type {
  default as WorkflowVisitor,
  WorkflowVisitorOptions,
} from './refractor/visitors/workflows-1/workflow/index.ts';
export type {
  default as WorkflowOutputsVisitor,
  OutputsVisitorOptions as WorkflowOutputsVisitorOptions,
} from './refractor/visitors/workflows-1/workflow/OutputsVisitor.ts';
export type {
  default as WorkflowStepsVisitor,
  StepsVisitorOptions as WorkflowStepsVisitorOptions,
} from './refractor/visitors/workflows-1/workflow/StepsVisitor.ts';
export type {
  default as FailureActionCriteriaVisitor,
  FailureActionCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/FailureActionCriteriaVisitor.ts';
export type {
  default as WorkflowsSpecificationVisitor,
  WorkflowsSpecificationVisitorOptions,
} from './refractor/visitors/workflows-1/index.ts';
export type {
  default as WorkflowsParametersVisitor,
  ParametersVisitorOptions as WorkflowsParametersVisitorOptions,
} from './refractor/visitors/workflows-1/ParametersVisitor.ts';
export type {
  default as WorkflowsSourceDescriptionsVisitor,
  SourceDescriptionsVisitorOptions as WorkflowsSourceDescriptionsVisitorOptions,
} from './refractor/visitors/workflows-1/SourceDescriptionsVisitor.ts';
export type {
  default as WorkflowsSuccessActionCriteriaVisitor,
  SuccessActionCriteriaVisitorOptions as WorkflowsSuccessActionCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/SuccessActionCriteriaVisitor.ts';
export type {
  default as WorkflowsSpecVisitor,
  WorkflowsSpecVisitorOptions,
} from './refractor/visitors/workflows-1/WorkflowsSpecVisitor.ts';
export type {
  default as WorkflowsVisitor,
  WorkflowsVisitorOptions,
} from './refractor/visitors/workflows-1/WorkflowsVisitor.ts';

export {
  isWorkflowsSpecElement,
  isWorkflowsSpecification1Element,
  isInfoElement,
  isSourceDescriptionElement,
  isSourceDescriptionsElement,
  isWorkflowElement,
  isWorkflowStepsElement,
  isWorkflowOutputsElement,
  isStepElement,
  isStepParametersElement,
  isStepDependsOnElement,
  isStepSuccessCriteriaElement,
  isStepOnSuccessElement,
  isStepOnFailureElement,
  isStepOutputsElement,
  isParameterElement,
  isSuccessActionElement,
  isSuccessActionCriteriaElement,
  isFailureActionElement,
  isFailureActionCriteriaElement,
  isComponentsElement,
  isCriterionElement,
  isReferenceElement,
  isJSONSchemaElement,
} from './predicates.ts';

export { isWorkflowsSpecificationExtension } from './refractor/predicates.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

// Workflows 1.0.0 elements
export {
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
  WorkflowElement,
  StepElement,
  ParameterElement,
  SuccessActionElement,
  FailureActionElement,
  ComponentsElement,
  CriterionElement,
  ReferenceElement,
  JSONSchemaElement,
} from './refractor/registration.ts';
// NCE types
export { default as SourceDescriptionsElement } from './elements/nces/SourceDescriptions.ts';
export { default as WorkflowsElement } from './elements/nces/Workflows.ts';
export { default as WorkflowStepsElement } from './elements/nces/WorkflowSteps.ts';
export { default as WorkflowOutputsElement } from './elements/nces/WorkflowOutputs.ts';
export { default as StepParametersElement } from './elements/nces/StepParameters.ts';
export { default as StepDependsOnElement } from './elements/nces/StepDependsOn.ts';
export { default as StepSuccessCriteriaElement } from './elements/nces/StepSuccessCriteria.ts';
export { default as StepOnSuccessElement } from './elements/nces/StepOnSuccess.ts';
export { default as StepOnFailureElement } from './elements/nces/StepOnFailure.ts';
export { default as StepOutputsElement } from './elements/nces/StepOutputs.ts';
export { default as SuccessActionCriteriaElement } from './elements/nces/SuccessActionCriteria.ts';
export { default as FailureActionCriteriaElement } from './elements/nces/FailureActionCriteria.ts';
export { default as ComponentsSchemas } from './elements/nces/ComponentsInputs.ts';
export { default as ComponentsParameters } from './elements/nces/ComponentsParameters.ts';
