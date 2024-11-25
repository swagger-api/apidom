export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, ApiDesignSystemsMediaTypes } from './media-types.ts';
export type { Format } from './media-types.ts';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace.ts';

export type { default as specificationObj } from './refractor/specification.ts';

export { default as refractPluginOpenApi3_1StandardIdentifierSelectors } from './refractor/plugins/openapi-3-1/standard-identifier-selectors.ts';
export { default as refractPluginOpenApi3_1StandardIdentifierAccessors } from './refractor/plugins/openapi-3-1/standard-identifier-accessors.ts';
export { default as validateOpenAPI3_1 } from './validator/openapi-3-1/validator.ts';
export {
  isInfoElement,
  isMainElement,
  isPrincipleElement,
  isRequirementElement,
  isRequirementLevelElement,
  isScenarioElement,
  isStandardElement,
  isStandardIdentifierElement,
} from './predicates.ts';

export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor.ts';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor.ts';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor.ts';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor.ts';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor.ts';
export { default as Visitor } from './refractor/visitors/Visitor.ts';
export type { VisitorOptions } from './refractor/visitors/Visitor.ts';

export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/api-design-systems/info/index.ts';
export type {
  default as MainVisitor,
  MainVisitorOptions,
} from './refractor/visitors/api-design-systems/main/index.ts';
export type {
  default as MainPrinciplesVisitor,
  PrinciplesVisitorOptions as MainPrinciplesVisitorOptions,
} from './refractor/visitors/api-design-systems/main/PrinciplesVisitor.ts';
export type {
  default as MainScenariosVisitor,
  ScenariosVisitorOptions as MainScenariosVisitorOptions,
} from './refractor/visitors/api-design-systems/main/ScenariosVisitor.ts';
export type {
  default as MainStandardsVisitor,
  StandardsVisitorOptions as MainStandardsVisitorOptions,
} from './refractor/visitors/api-design-systems/main/StandardsVisitor.ts';
export type {
  default as PrincipleVisitor,
  PrincipleVisitorOptions,
} from './refractor/visitors/api-design-systems/principle/index.ts';
export type {
  default as RequirementVisitor,
  RequirementVisitorOptions,
} from './refractor/visitors/api-design-systems/requirement/index.ts';
export type {
  default as RequirementLevelVisitor,
  RequirementLevelVisitorOptions,
} from './refractor/visitors/api-design-systems/requirement-level/index.ts';
export type {
  default as ScenarioVisitor,
  ScenarioVisitorOptions,
} from './refractor/visitors/api-design-systems/scenario/index.ts';
export type {
  default as ScenarioThenVisitor,
  ThenVisitorOptions as ScenarioThenVisitorOptions,
} from './refractor/visitors/api-design-systems/scenario/ThenVisitor.ts';
export type {
  default as StandardVisitor,
  StandardVisitorOptions,
} from './refractor/visitors/api-design-systems/standard/index.ts';
export type {
  default as StandardIdentifierVisitor,
  StandardIdentifierVisitorOptions,
} from './refractor/visitors/api-design-systems/standard-identifier/index.ts';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor.ts';

export { keyMap, getNodeType } from './traversal/visitor.ts';

/**
 * API Design Systems 2021-05-07 specification elements.
 */
export {
  MainElement,
  InfoElement,
  PrincipleElement,
  RequirementElement,
  RequirementLevelElement,
  ScenarioElement,
  StandardElement,
  StandardIdentifierElement,
} from './refractor/registration.ts';
