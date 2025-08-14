import jsonSchema202012Lint from '../../json-schema/2020-12/json-schema/lint.ts';
import { compose, assoc } from '../../json-schema/2020-12/target-specs.ts';
// below are older rule variants that need to be replaced
import additionalItemsNonArrayLint from '../../common/schema/lint/additional-items--non-array.ts';
import additionalItemsTypeLint from '../../common/schema/lint/additional-items--type.ts';
import additionalItemsTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/additional-items--type-openapi-3-1--asyncapi-2.ts';
import additionalPropertiesNonObject from '../../common/schema/lint/additional-properties--non-object.ts';
import additionalPropertiesTypeLint from '../../common/schema/lint/additional-properties--type.ts';
import allOfTypeLint from '../../common/schema/lint/all-of--type.ts';
import allOfTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/all-of--type-openapi-3-1--asyncapi-2.ts';
import anyOfTypeLint from '../../common/schema/lint/any-of--type.ts';
import anyOfTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/any-of--type-openapi-3-1--asyncapi-2.ts';
import containsNonArrayLint from '../../common/schema/lint/contains--non-array.ts';
import containsTypeLint from '../../common/schema/lint/contains--type.ts';
import containsTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/contains--type-openapi-3-1--asyncapi-2.ts';
import descriptionTypeLint from '../../common/schema/lint/description--type.ts';
import discriminatorExistInRequiredLint from '../../common/schema/lint/discriminator--exist-in-required.ts';
import discriminatorTypeOpenAPI3Lint from '../../common/schema/lint/discriminator--type-openapi-3.ts';
import elseNonIfLint from '../../common/schema/lint/else--non-if.ts';
import elseTypeLint from '../../common/schema/lint/else--type.ts';
import enumUniqueLint from '../../common/schema/lint/enum--unique.ts';
import enumTypeLint from '../../common/schema/lint/enum--type.ts';
import examplesTypeLint from '../../common/schema/lint/examples--type.ts';
import exclusiveMaximumTypeNumberLint from '../../common/schema/lint/exclusive-maximum--type-number.ts';
import exclusiveMaximumTypeBooleanLint from '../../common/schema/lint/exclusive-maximum--type-boolean.ts';
import exclusiveMinimumTypeBooleanLint from '../../common/schema/lint/exclusive-minimum--type-boolean.ts';
import exclusiveMinimumTypeNumberLint from '../../common/schema/lint/exclusive-minimum--type-number.ts';
import xmlTypeLint from '../../common/schema/lint/xml--type.ts';
import externalDocsTypeLint from '../../common/schema/lint/external-docs--type.ts';
import formatTypeLint from '../../common/schema/lint/format--type.ts';
import ifNonThenLint from '../../common/schema/lint/if--non-then.ts';
import ifTypeLint from '../../common/schema/lint/if--type.ts';
import itemsNonArrayLint from '../../common/schema/lint/items--non-array.ts';
import itemsTypeLint from '../../common/schema/lint/items--type.ts';
import maxItemsNonArrayLint from '../../common/schema/lint/max-items--non-array.ts';
import maxItemsTypeLint from '../../common/schema/lint/max-items--type.ts';
import maxLengthNonStringLint from '../../common/schema/lint/max-length--non-string.ts';
import maxLengthTypeLint from '../../common/schema/lint/max-length--type.ts';
import maximumTypeLint from '../../common/schema/lint/maximum--type.ts';
import minItemsNonArrayLint from '../../common/schema/lint/min-items--non-array.ts';
import minItemsTypeLint from '../../common/schema/lint/min-items--type.ts';
import minLengthNonString from '../../common/schema/lint/min-length--non-string.ts';
import minLengthTypeLint from '../../common/schema/lint/min-length--type.ts';
import minPropertiesNonObjectLint from '../../common/schema/lint/min-properties--non-object.ts';
import minPropertiesTypeLint from '../../common/schema/lint/min-properties--type.ts';
import minimumTypeLint from '../../common/schema/lint/minimum--type.ts';
import missingCoreFieldsOpenAPI3_1Lint from '../../common/schema/lint/missing-core-fields-openapi-3-1.ts';
import multipleOfTypeLint from '../../common/schema/lint/multiple-of--type.ts';
import notTypeLint from '../../common/schema/lint/not--type.ts';
import notTypeOpenAPI3_1_AsyncAPI2Lint from '../../common/schema/lint/not--type-openapi-3-1-asyncapi-2.ts';
import nullableTypeLint from '../../common/schema/lint/nullable--type.ts';
import nullableNotRecommendedLint from '../../common/schema/lint/nullable--not-recommended.ts';
import oneOfTypeLint from '../../common/schema/lint/one-of--type.ts';
import oneOfTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/one-of--type-openapi-3-1--asyncapi-2.ts';
import patternTypeLint from '../../common/schema/lint/pattern--type.ts';
import patternPropertiesKeysRegexpLint from '../../common/schema/lint/pattern-properties--keys-regexp.ts';
import patternPropertiesNonObjectLint from '../../common/schema/lint/pattern-properties--non-object.ts';
import patternPropertiesTypeLint from '../../common/schema/lint/pattern-properties--type.ts';
import patternPropertiesValuesTypeLint from '../../common/schema/lint/pattern-properties--values-type.ts';
import propertiesTypeLint from '../../common/schema/lint/properties--type.ts';
import propertiesValuesTypeLint from '../../common/schema/lint/properties--values-type.ts';
import propertiesValuesTypeOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/properties--values-type-openapi-3-1--asyncapi-2.ts';
import propertyNamesNonObjectLint from '../../common/schema/lint/property-names--non-object.ts';
import propertyNamesTypeLint from '../../common/schema/lint/property-names--type.ts';
import readOnlyTypeLint from '../../common/schema/lint/read-only--type.ts';
import requiredDefinedLint from '../../common/schema/lint/required--defined.ts';
import requiredNonObjectLint from '../../common/schema/lint/required--non-object.ts';
import requiredTypeLint from '../../common/schema/lint/required--type.ts';
import thenNonIfLint from '../../common/schema/lint/then--non-if.ts';
import thenTypeLint from '../../common/schema/lint/then--type.ts';
import titleTypeLint from '../../common/schema/lint/title--type.ts';
import typeTypeLint from '../../common/schema/lint/type--type.ts';
import typeEqualsLint from '../../common/schema/lint/type--equals.ts';
import typeEqualsOpenAPI3_1__AsyncAPI2Lint from '../../common/schema/lint/type--equals-openapi-3-1--asyncapi-2.ts';
import uniqueItemsNonArrayLint from '../../common/schema/lint/unique-items--non-array.ts';
import uniqueItemsTypeLint from '../../common/schema/lint/unique-items--type.ts';
import writeOnlyTypeLint from '../../common/schema/lint/write-only--type.ts';
import exampleDeprecatedLint from '../../common/schema/lint/example--deprecated.ts';
import $refNotUsedLint from '../../common/schema/lint/$ref--not-used.ts';
import $ref3RequestBodiesLint from '../../common/schema/lint/$ref-3-0--request-bodies.ts';
import $refNoSiblingsLint from '../../common/schema/lint/$ref--no-siblings.ts';
import $refValidLint from '../../common/schema/lint/$ref--valid.ts';
import { OpenAPI31 } from '../target-specs.ts';
import enumDefaultValueLint from '../../common/schema/lint/enum--default-value.ts';
import minimumValueLint from '../../common/schema/lint/minimum-maximum--value.ts';
import minLengthValueLint from '../../common/schema/lint/min-length-max-length--value.ts';
import minPropertiesValueLint from '../../common/schema/lint/min-properties-max-properties--value.ts';
import minItemsValueLint from '../../common/schema/lint/min-items-max-items--value.ts';
import readOnlyWriteOnlyLint from '../../common/schema/lint/read-only-write-only-3-0.ts';
import readOnlyRequiredLint from '../../common/schema/lint/required--read-only-2.ts';

const schemaLints = [
  ...compose([jsonSchema202012Lint], assoc(OpenAPI31)),

  additionalItemsNonArrayLint,
  additionalItemsTypeLint,
  additionalItemsTypeOpenAPI3_1__AsyncAPI2Lint,
  additionalPropertiesNonObject,
  additionalPropertiesTypeLint,
  allOfTypeLint,
  allOfTypeOpenAPI3_1__AsyncAPI2Lint,
  anyOfTypeOpenAPI3_1__AsyncAPI2Lint,
  anyOfTypeLint,
  containsNonArrayLint,
  containsTypeLint,
  containsTypeOpenAPI3_1__AsyncAPI2Lint,
  descriptionTypeLint,
  discriminatorExistInRequiredLint,
  discriminatorTypeOpenAPI3Lint,
  elseNonIfLint,
  elseTypeLint,
  enumUniqueLint,
  enumTypeLint,
  enumDefaultValueLint,
  examplesTypeLint,
  exclusiveMaximumTypeNumberLint,
  exclusiveMaximumTypeBooleanLint,
  exclusiveMinimumTypeNumberLint,
  exclusiveMinimumTypeBooleanLint,
  xmlTypeLint,
  externalDocsTypeLint,
  formatTypeLint,
  ifNonThenLint,
  ifTypeLint,
  itemsNonArrayLint,
  itemsTypeLint,
  maxItemsNonArrayLint,
  maxItemsTypeLint,
  maxLengthNonStringLint,
  maxLengthTypeLint,
  maximumTypeLint,
  minItemsNonArrayLint,
  minItemsTypeLint,
  minLengthNonString,
  minLengthTypeLint,
  minPropertiesNonObjectLint,
  minPropertiesTypeLint,
  minimumTypeLint,
  minimumValueLint,
  minLengthValueLint,
  minPropertiesValueLint,
  minItemsValueLint,
  missingCoreFieldsOpenAPI3_1Lint,
  multipleOfTypeLint,
  notTypeLint,
  notTypeOpenAPI3_1_AsyncAPI2Lint,
  nullableTypeLint,
  nullableNotRecommendedLint,
  oneOfTypeLint,
  oneOfTypeOpenAPI3_1__AsyncAPI2Lint,
  patternTypeLint,
  patternPropertiesKeysRegexpLint,
  patternPropertiesNonObjectLint,
  patternPropertiesTypeLint,
  patternPropertiesValuesTypeLint,
  propertiesTypeLint,
  propertiesValuesTypeLint,
  propertiesValuesTypeOpenAPI3_1__AsyncAPI2Lint,
  propertyNamesNonObjectLint,
  propertyNamesTypeLint,
  readOnlyTypeLint,
  readOnlyWriteOnlyLint,
  readOnlyRequiredLint,
  requiredDefinedLint,
  requiredNonObjectLint,
  requiredTypeLint,
  thenNonIfLint,
  thenTypeLint,
  titleTypeLint,
  typeTypeLint,
  typeEqualsLint,
  typeEqualsOpenAPI3_1__AsyncAPI2Lint,
  uniqueItemsNonArrayLint,
  uniqueItemsTypeLint,
  writeOnlyTypeLint,
  exampleDeprecatedLint,
  $refNotUsedLint,
  $refNoSiblingsLint,
  $refValidLint,
  $ref3RequestBodiesLint,
];

export default schemaLints;
