import $idFormatURILint from './$id--format-uri';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';
import additionalItemsNonArrayLint from './additional-items--non-array';
import additionalItemsTypeLint from './additional-items--type';
import additionalItemsTypeOpenAPI3_1_AsyncAPI2Lint from './additional-items--type-openapi-3-1-asyncapi-2';
import additionalPropertiesNonObject from './additional-properties--non-object';
import additionalPropertiesTypeLint from './additional-properties--type';
import allOfTypeLint from './all-of--type';
import allOfTypeOpenAPI3_1_AsyncAPI2Lint from './all-of--type-openapi-3-1-asyncapi-2';
import anyOfTypeLint from './any-of--type';
import anyOfTypeOpenAPI3_1_AsyncAPI2Lint from './any-of--type-openapi-3-1-asyncapi-2';
import containsNonArrayLint from './contains--non-array';
import containsTypeLint from './contains--type';
import containsTypeOpenAPI3_1_AsyncAPI2Lint from './contains--type-openapi-3-1-asyncapi-2';
import descriptionTypeLint from './description--type';
import discriminatorExistInRequiredLint from './discriminator--exist-in-required';
import discriminatorTypeLint from './discriminator--type-asyncapi-2-0--2-4';
import elseNonIfLint from './else--non-if';
import elseTypeLint from './else--type';
import elseTypeOpenAPI3_1_AsyncAPI2Lint from './else--type-openapi-3-1-asyncapi-2';
import enumUniqueLint from './enum--unique';
import examplesTypeLint from './examples--type';
import exclusiveMaximumPatternLint from './exclusive-maximum--pattern';
import exclusiveMinimumPatternLint from './exclusive-minimum--pattern';
import externalDocsTypeLint from './external-docs--type';
import formatTypeLint from './format--type';
import ifNonThenLint from './if--non-then';
import ifTypeLint from './if--type';
import ifTypeOpenAPI3_1_AsyncAPI2Lint from './if--type-openapi-3-1-asyncapi-2';
import itemsNonArrayLint from './items--non-array';
import itemsTypeLint from './items--type';
import maxItemsNonArrayLint from './max-items--non-array';
import maxItemsTypeLint from './max-items--type';
import maxLengthNonStringLint from './max-length--non-string';
import maxLengthTypeLint from './max-length--type';
import maximumPatternLint from './maximum--pattern';
import minItemsNonArrayLint from './min-items--non-array';
import minItemsTypeLint from './min-items--type';
import minLengthNonString from './min-length--non-string';
import minLengthTypeLint from './min-length--type';
import minPropertiesNonObjectLint from './min-properties--non-object';
import minPropertiesTypeLint from './min-properties--type';
import minimumPatternLint from './minimum--pattern';
import missingCoreFieldsOpenAPI2_0Lint from './missing-core-fields-openapi-2-0';
import missingCoreFieldsOpenAPI3_0Lint from './missing-core-fields-openapi-3-0';
import missingCoreFieldsOpenAPI3_1Lint from './missing-core-fields-openapi-3-1';
import missingCoreFieldsAsyncAPI2Lint from './missing-core-fields-asyncapi-2';
import multipleOfTypeLint from './multiple-of--type';
import notTypeLint from './not--type';
import notTypeOpenAPI3_1_AsyncAPI2Lint from './not--type-openapi-3-1-asyncapi-2';
import nullableNotRecommendedLint from './nullable--not-recommended';
import oneOfTypeLint from './one-of--type';
import oneOfTypeOpenAPI3_1_AsyncAPI2Lint from './one-of--type-openapi-3-1-asyncapi-2';
import patternTypeLint from './pattern--type';
import patternPropertiesKeysRegexpLint from './pattern-properties--keys-regexp';
import patternPropertiesNonObjectLint from './pattern-properties--non-object';
import patternPropertiesTypeLint from './pattern-properties--type';
import patternPropertiesValuesTypeLint from './pattern-properties--values-type';
import propertiesTypeLint from './properties--type';
import propertiesValuesTypeLint from './properties--values-type';
import propertiesValuesTypeOpenAPI3_1_AsyncAPI2Lint from './properties--values-type-openapi-3-1-asyncapi-2';
import propertyNamesNonObjectLint from './property-names--non-object';
import propertyNamesTypeLint from './property-names--type';
import propertyNamesTypeOpenAPI3_1_AsyncAPI2Lint from './property-names--type-openapi-3-1-asyncapi-2';
import readOnlyTypeLint from './read-only--type';
import requiredDefinedLint from './required--defined';
import requiredNonObjectLint from './required--non-object';
import requiredTypeLint from './required--type';
import thenNonIfLint from './then--non-if';
import thenTypeLint from './then--type';
import thenTypeOpenAPI3_1_AsyncAPI2Lint from './then--type-openapi-3-1-asyncapi-2';
import titleTypeLint from './title--type';
import typeTypeLint from './type--type';
import typeTypeOpenAPI3_0Lint from './type--type-openapi-3-0';
import uniqueItemsNonArrayLint from './unique-items--non-array';
import uniqueItemsTypeLint from './unique-items--type';
import writeOnlyTypeLint from './write-only--type';
import exampleDeprecatedLint from './example--deprecated';

const schemaLints = [
  $idFormatURILint,
  $refValidLint,
  $refNoSiblingsLint,
  additionalItemsNonArrayLint,
  additionalItemsTypeLint,
  additionalItemsTypeOpenAPI3_1_AsyncAPI2Lint,
  additionalPropertiesNonObject,
  additionalPropertiesTypeLint,
  allOfTypeLint,
  allOfTypeOpenAPI3_1_AsyncAPI2Lint,
  anyOfTypeOpenAPI3_1_AsyncAPI2Lint,
  anyOfTypeLint,
  containsNonArrayLint,
  containsTypeLint,
  containsTypeOpenAPI3_1_AsyncAPI2Lint,
  descriptionTypeLint,
  discriminatorExistInRequiredLint,
  discriminatorTypeLint,
  elseNonIfLint,
  elseTypeLint,
  elseTypeOpenAPI3_1_AsyncAPI2Lint,
  enumUniqueLint,
  examplesTypeLint,
  exclusiveMaximumPatternLint,
  exclusiveMinimumPatternLint,
  externalDocsTypeLint,
  formatTypeLint,
  ifNonThenLint,
  ifTypeLint,
  ifTypeOpenAPI3_1_AsyncAPI2Lint,
  itemsNonArrayLint,
  itemsTypeLint,
  maxItemsNonArrayLint,
  maxItemsTypeLint,
  maxLengthNonStringLint,
  maxLengthTypeLint,
  maximumPatternLint,
  minItemsNonArrayLint,
  minItemsTypeLint,
  minLengthNonString,
  minLengthTypeLint,
  minPropertiesNonObjectLint,
  minPropertiesTypeLint,
  minimumPatternLint,
  missingCoreFieldsOpenAPI2_0Lint,
  missingCoreFieldsOpenAPI3_0Lint,
  missingCoreFieldsOpenAPI3_1Lint,
  missingCoreFieldsAsyncAPI2Lint,
  multipleOfTypeLint,
  notTypeLint,
  notTypeOpenAPI3_1_AsyncAPI2Lint,
  nullableNotRecommendedLint,
  oneOfTypeLint,
  oneOfTypeOpenAPI3_1_AsyncAPI2Lint,
  patternTypeLint,
  patternPropertiesKeysRegexpLint,
  patternPropertiesNonObjectLint,
  patternPropertiesTypeLint,
  patternPropertiesValuesTypeLint,
  propertiesTypeLint,
  propertiesValuesTypeLint,
  propertiesValuesTypeOpenAPI3_1_AsyncAPI2Lint,
  propertyNamesNonObjectLint,
  propertyNamesTypeLint,
  propertyNamesTypeOpenAPI3_1_AsyncAPI2Lint,
  readOnlyTypeLint,
  requiredDefinedLint,
  requiredNonObjectLint,
  requiredTypeLint,
  thenNonIfLint,
  thenTypeLint,
  thenTypeOpenAPI3_1_AsyncAPI2Lint,
  titleTypeLint,
  typeTypeLint,
  typeTypeOpenAPI3_0Lint,
  uniqueItemsNonArrayLint,
  uniqueItemsTypeLint,
  writeOnlyTypeLint,
  exampleDeprecatedLint,
];

export default schemaLints;
