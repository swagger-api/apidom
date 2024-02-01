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

export { default as mediaTypes, WorkflowsMediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';

export { default as refract, createRefractor } from './refractor';
export { default as specificationObj } from './refractor/specification';

export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as MapVisitor } from './refractor/visitors/generics/MapVisitor';
export type { MapVisitorOptions } from './refractor/visitors/generics/MapVisitor';
export { default as PatternedFieldsVisitor } from './refractor/visitors/generics/PatternedFieldsVisitor';
export type { PatternedFieldsVisitorOptions } from './refractor/visitors/generics/PatternedFieldsVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor';
export { default as SpecificationExtensionVisitor } from './refractor/visitors/SpecificationExtensionVisitor';
export type { SpecificationExtensionVisitorOptions } from './refractor/visitors/SpecificationExtensionVisitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';
export type { VisitorOptions } from './refractor/visitors/Visitor';

export type {
  default as ComponentsVisitor,
  ComponentsVisitorOptions,
} from './refractor/visitors/workflows-1/components';
export type {
  default as ComponentsInputsVisitor,
  InputsVisitorOptions as ComponentsInputsVisitorOptions,
} from './refractor/visitors/workflows-1/components/InputsVisitor';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/workflows-1/components/ParametersVisitor';
export type {
  default as CriterionVisitor,
  CriterionVisitorOptions,
} from './refractor/visitors/workflows-1/criterion';
export type {
  default as FailureVisitor,
  FailureActionVisitorOptions,
} from './refractor/visitors/workflows-1/failure-action';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/workflows-1/info';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/workflows-1/info/VersionVisitor';
export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
} from './refractor/visitors/workflows-1/json-schema';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/workflows-1/parameter';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/workflows-1/reference/$RefVisitor';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/workflows-1/reference';
export type {
  default as SourceDescriptionsVisitor,
  SourceDescriptionVisitorOptions,
} from './refractor/visitors/workflows-1/source-description';
export type {
  default as SourceDescriptionsUrlVisitor,
  UrlVisitorOptions as SourceDescriptionsUrlVisitorOptions,
} from './refractor/visitors/workflows-1/source-description/UrlVisitor';
export type {
  default as StepDependsOnVisitor,
  DependsOnVisitorOptions as StepDependsOnVisitorOptions,
} from './refractor/visitors/workflows-1/step/DependsOnVisitor';
export type {
  default as StepsVisitor,
  StepVisitorOptions,
} from './refractor/visitors/workflows-1/step';
export type {
  default as StepOnFailureVisitor,
  OnFailureVisitorOptions as StepOnFailureVisitorOptions,
} from './refractor/visitors/workflows-1/step/OnFailureVisitor';
export type {
  default as StepOnSuccessVisitor,
  OnSuccessVisitorOptions as StepOnSuccessVisitorOptions,
} from './refractor/visitors/workflows-1/step/OnSuccessVisitor';
export type {
  default as StepOutputsVisitor,
  OutputsVisitorOptions as StepOutputsVisitorOptions,
} from './refractor/visitors/workflows-1/step/OutputsVisitor';
export type {
  default as StepParametersVisitor,
  ParametersVisitorOptions as StepParametersVisitorOptions,
} from './refractor/visitors/workflows-1/step/ParametersVisitor';
export type {
  default as StepSuccessCriteriaVisitor,
  SuccessCriteriaVisitorOptions as StepSuccessCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/step/SuccessCriteriaVisitor';
export type {
  default as SuccessActionVisitor,
  SuccessActionVisitorOptions,
} from './refractor/visitors/workflows-1/success-action';
export type {
  default as WorkflowVisitor,
  WorkflowVisitorOptions,
} from './refractor/visitors/workflows-1/workflow';
export type {
  default as WorkflowOutputsVisitor,
  OutputsVisitorOptions as WorkflowOutputsVisitorOptions,
} from './refractor/visitors/workflows-1/workflow/OutputsVisitor';
export type {
  default as WorkflowStepsVisitor,
  StepsVisitorOptions as WorkflowStepsVisitorOptions,
} from './refractor/visitors/workflows-1/workflow/StepsVisitor';
export type {
  default as FailureActionCriteriaVisitor,
  FailureActionCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/FailureActionCriteriaVisitor';
export type {
  default as WorkflowsSpecificationVisitor,
  WorkflowsSpecificationVisitorOptions,
} from './refractor/visitors/workflows-1';
export type {
  default as WorkflowsParametersVisitor,
  ParametersVisitorOptions as WorkflowsParametersVisitorOptions,
} from './refractor/visitors/workflows-1/ParametersVisitor';
export type {
  default as WorkflowsSourceDescriptionsVisitor,
  SourceDescriptionsVisitorOptions as WorkflowsSourceDescriptionsVisitorOptions,
} from './refractor/visitors/workflows-1/SourceDescriptionsVisitor';
export type {
  default as WorkflowsSuccessActionCriteriaVisitor,
  SuccessActionCriteriaVisitorOptions as WorkflowsSuccessActionCriteriaVisitorOptions,
} from './refractor/visitors/workflows-1/SuccessActionCriteriaVisitor';
export type {
  default as WorkflowsSpecVisitor,
  WorkflowsSpecVisitorOptions,
} from './refractor/visitors/workflows-1/WorkflowsSpecVisitor';
export type {
  default as WorkflowsVisitor,
  WorkflowsVisitorOptions,
} from './refractor/visitors/workflows-1/WorkflowsVisitor';

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
} from './predicates';

export { isWorkflowsSpecificationExtension } from './refractor/predicates';

export { keyMap, getNodeType } from './traversal/visitor';

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
} from './refractor/registration';
// NCE types
export { default as SourceDescriptionsElement } from './elements/nces/SourceDescriptions';
export { default as WorkflowsElement } from './elements/nces/Workflows';
export { default as WorkflowStepsElement } from './elements/nces/WorkflowSteps';
export { default as WorkflowOutputsElement } from './elements/nces/WorkflowOutputs';
export { default as StepParametersElement } from './elements/nces/StepParameters';
export { default as StepDependsOnElement } from './elements/nces/StepDependsOn';
export { default as StepSuccessCriteriaElement } from './elements/nces/StepSuccessCriteria';
export { default as StepOnSuccessElement } from './elements/nces/StepOnSuccess';
export { default as StepOnFailureElement } from './elements/nces/StepOnFailure';
export { default as StepOutputsElement } from './elements/nces/StepOutputs';
export { default as SuccessActionCriteriaElement } from './elements/nces/SuccessActionCriteria';
export { default as FailureActionCriteriaElement } from './elements/nces/FailureActionCriteria';
export { default as ComponentsSchemas } from './elements/nces/ComponentsInputs';
export { default as ComponentsParameters } from './elements/nces/ComponentsParameters';
