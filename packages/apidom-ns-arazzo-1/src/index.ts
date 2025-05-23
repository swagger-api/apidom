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

export { default as mediaTypes, ArazzoMediaTypes } from './media-types.ts';
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
} from './refractor/visitors/arazzo-1/components/index.ts';
export type {
  default as ComponentsInputsVisitor,
  InputsVisitorOptions as ComponentsInputsVisitorOptions,
} from './refractor/visitors/arazzo-1/components/InputsVisitor.ts';
export type {
  default as ComponentsParametersVisitor,
  ParametersVisitorOptions as ComponentsParametersVisitorOptions,
} from './refractor/visitors/arazzo-1/components/ParametersVisitor.ts';
export type {
  default as CriterionVisitor,
  CriterionVisitorOptions,
} from './refractor/visitors/arazzo-1/criterion/index.ts';
export type {
  default as FailureVisitor,
  FailureActionVisitorOptions,
} from './refractor/visitors/arazzo-1/failure-action/index.ts';
export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/arazzo-1/info/index.ts';
export type {
  default as InfoVersionVisitor,
  VersionVisitorOptions as InfoVersionVisitorOptions,
} from './refractor/visitors/arazzo-1/info/VersionVisitor.ts';
export type {
  default as JSONSchemaVisitor,
  JSONSchemaVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';
export type {
  default as ParameterVisitor,
  ParameterVisitorOptions,
} from './refractor/visitors/arazzo-1/parameter/index.ts';
export type {
  default as Reference$RefVisitor,
  $RefVisitorOptions as Reference$RefVisitorOptions,
} from './refractor/visitors/arazzo-1/reference/$RefVisitor.ts';
export type {
  default as ReferenceVisitor,
  ReferenceVisitorOptions,
} from './refractor/visitors/arazzo-1/reference/index.ts';
export type {
  default as SourceDescriptionsVisitor,
  SourceDescriptionVisitorOptions,
} from './refractor/visitors/arazzo-1/source-description/index.ts';
export type {
  default as SourceDescriptionsUrlVisitor,
  UrlVisitorOptions as SourceDescriptionsUrlVisitorOptions,
} from './refractor/visitors/arazzo-1/source-description/UrlVisitor.ts';
export type {
  default as StepDependsOnVisitor,
  DependsOnVisitorOptions as StepDependsOnVisitorOptions,
} from './refractor/visitors/arazzo-1/step/DependsOnVisitor.ts';
export type {
  default as StepsVisitor,
  StepVisitorOptions,
} from './refractor/visitors/arazzo-1/step/index.ts';
export type {
  default as StepOnFailureVisitor,
  OnFailureVisitorOptions as StepOnFailureVisitorOptions,
} from './refractor/visitors/arazzo-1/step/OnFailureVisitor.ts';
export type {
  default as StepOnSuccessVisitor,
  OnSuccessVisitorOptions as StepOnSuccessVisitorOptions,
} from './refractor/visitors/arazzo-1/step/OnSuccessVisitor.ts';
export type {
  default as StepOutputsVisitor,
  OutputsVisitorOptions as StepOutputsVisitorOptions,
} from './refractor/visitors/arazzo-1/step/OutputsVisitor.ts';
export type {
  default as StepParametersVisitor,
  ParametersVisitorOptions as StepParametersVisitorOptions,
} from './refractor/visitors/arazzo-1/step/ParametersVisitor.ts';
export type {
  default as StepSuccessCriteriaVisitor,
  SuccessCriteriaVisitorOptions as StepSuccessCriteriaVisitorOptions,
} from './refractor/visitors/arazzo-1/step/SuccessCriteriaVisitor.ts';
export type {
  default as SuccessActionVisitor,
  SuccessActionVisitorOptions,
} from './refractor/visitors/arazzo-1/success-action/index.ts';
export type {
  default as WorkflowVisitor,
  WorkflowVisitorOptions,
} from './refractor/visitors/arazzo-1/workflow/index.ts';
export type {
  default as WorkflowOutputsVisitor,
  OutputsVisitorOptions as WorkflowOutputsVisitorOptions,
} from './refractor/visitors/arazzo-1/workflow/OutputsVisitor.ts';
export type {
  default as ArazzoStepsVisitor,
  StepsVisitorOptions as ArazzoStepsVisitorOptions,
} from './refractor/visitors/arazzo-1/workflow/StepsVisitor.ts';
export type {
  default as FailureActionCriteriaVisitor,
  FailureActionCriteriaVisitorOptions,
} from './refractor/visitors/arazzo-1/FailureActionCriteriaVisitor.ts';
export type {
  default as ArazzoSpecificationVisitor,
  ArazzoSpecificationVisitorOptions,
} from './refractor/visitors/arazzo-1/index.ts';
export type {
  default as ArazzoParametersVisitor,
  ParametersVisitorOptions as ArazzoParametersVisitorOptions,
} from './refractor/visitors/arazzo-1/ParametersVisitor.ts';
export type {
  default as ArazzoSourceDescriptionsVisitor,
  SourceDescriptionsVisitorOptions as ArazzoSourceDescriptionsVisitorOptions,
} from './refractor/visitors/arazzo-1/SourceDescriptionsVisitor.ts';
export type {
  default as ArazzoSuccessActionCriteriaVisitor,
  SuccessActionCriteriaVisitorOptions as ArazzoSuccessActionCriteriaVisitorOptions,
} from './refractor/visitors/arazzo-1/SuccessActionCriteriaVisitor.ts';
export type {
  default as ArazzoSpecVisitor,
  ArazzoSpecVisitorOptions,
} from './refractor/visitors/arazzo-1/ArazzoSpecVisitor.ts';
export type {
  default as WorkflowsVisitor,
  WorkflowsVisitorOptions,
} from './refractor/visitors/arazzo-1/WorkflowsVisitor.ts';

export {
  isArazzoSpecElement,
  isArazzoSpecification1Element,
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

export { isArazzoSpecificationExtension } from './refractor/predicates.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

// Arazzo 1.0.1 elements
export {
  ArazzoSpecification1Element,
  ArazzoSpecElement,
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
