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

export { default as mediaTypes, ApiDesignSystemsMediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractPluginOpenApi3_1StandardIdentifierSelectors } from './refractor/plugins/openapi-3-1/standard-identifier-selectors';
export { default as refractPluginOpenApi3_1StandardIdentifierAccessors } from './refractor/plugins/openapi-3-1/standard-identifier-accessors';
export { default as validateOpenAPI3_1 } from './validator/openapi-3-1/validator';
export {
  isInfoElement,
  isMainElement,
  isPrincipleElement,
  isRequirementElement,
  isRequirementLevelElement,
  isScenarioElement,
  isStandardElement,
  isStandardIdentifierElement,
} from './predicates';

export { default as FixedFieldsVisitor } from './refractor/visitors/generics/FixedFieldsVisitor';
export type { FixedFieldsVisitorOptions } from './refractor/visitors/generics/FixedFieldsVisitor';
export { default as SpecificationVisitor } from './refractor/visitors/SpecificationVisitor';
export type { SpecificationVisitorOptions } from './refractor/visitors/SpecificationVisitor';
export { default as FallbackVisitor } from './refractor/visitors/FallbackVisitor';
export type { FallbackVisitorOptions } from './refractor/visitors/FallbackVisitor';
export { default as Visitor } from './refractor/visitors/Visitor';
export type { VisitorOptions } from './refractor/visitors/Visitor';

export type {
  default as InfoVisitor,
  InfoVisitorOptions,
} from './refractor/visitors/api-design-systems/info';
export type {
  default as MainVisitor,
  MainVisitorOptions,
} from './refractor/visitors/api-design-systems/main';
export type {
  default as MainPrinciplesVisitor,
  PrinciplesVisitorOptions as MainPrinciplesVisitorOptions,
} from './refractor/visitors/api-design-systems/main/PrinciplesVisitor';
export type {
  default as MainScenariosVisitor,
  ScenariosVisitorOptions as MainScenariosVisitorOptions,
} from './refractor/visitors/api-design-systems/main/ScenariosVisitor';
export type {
  default as MainStandardsVisitor,
  StandardsVisitorOptions as MainStandardsVisitorOptions,
} from './refractor/visitors/api-design-systems/main/StandardsVisitor';
export type {
  default as PrincipleVisitor,
  PrincipleVisitorOptions,
} from './refractor/visitors/api-design-systems/principle';
export type {
  default as RequirementVisitor,
  RequirementVisitorOptions,
} from './refractor/visitors/api-design-systems/requirement';
export type {
  default as RequirementLevelVisitor,
  RequirementLevelVisitorOptions,
} from './refractor/visitors/api-design-systems/requirement-level';
export type {
  default as ScenarioVisitor,
  ScenarioVisitorOptions,
} from './refractor/visitors/api-design-systems/scenario';
export type {
  default as ScenarioThenVisitor,
  ThenVisitorOptions as ScenarioThenVisitorOptions,
} from './refractor/visitors/api-design-systems/scenario/ThenVisitor';
export type {
  default as StandardVisitor,
  StandardVisitorOptions,
} from './refractor/visitors/api-design-systems/standard';
export type {
  default as StandardIdentifierVisitor,
  StandardIdentifierVisitorOptions,
} from './refractor/visitors/api-design-systems/standard-identifier';

export type { SpecPath } from './refractor/visitors/generics/FixedFieldsVisitor';

export { keyMap, getNodeType } from './traversal/visitor';

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
} from './refractor/registration';
