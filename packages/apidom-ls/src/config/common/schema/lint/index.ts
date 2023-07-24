import $idFormatURILint from './$id--format-uri';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';
import additionalItemsNonArrayLint from './additional-items--non-array';
import additionalItemsTypeLint from './additional-items--type';
import additionalPropertiesNonObject from './additional-properties--non-object';
import additionalPropertiesTypeLint from './additional-properties--type';
import allOfTypeLint from './all-of--type';
import allOfTypeOpenApi30Lint from './all-of--type-openapi-3-0';
import anyOfTypeLint from './any-of--type';
import anyOfTypeOpenApi30Lint from './any-of--type-openapi-3-0';
import containsNonArrayLint from './contains--non-array';
import containsTypeLint from './contains--type';
import descriptionTypeLint from './description--type';
import discriminatorExistInRequiredLint from './discriminator--exist-in-required';
import discriminatorTypeLint from './discriminator--type-asyncapi-2-0--2-4';
import elseNonIfLint from './else--non-if';
import elseTypeLint from './else--type';
import enumUniqueLint from './enum--unique';
import examplesTypeLint from './examples--type';
import exclusiveMaximumPatternLint from './exclusive-maximum--pattern';
import exclusiveMinimumPatternLint from './exclusive-minimum--pattern';
import externalDocsTypeLint from './external-docs--type';
import formatTypeLint from './format--type';
import ifNonThenLint from './if--non-then';
import ifTypeLint from './if--type';
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
import multipleOfTypeLint from './multiple-of--type';
import notTypeLint from './not--type';
import oneOfTypeLint from './one-of--type';
import oneOfTypeOpenApi30Lint from './one-of--type-openapi-3-0';
import patternTypeLint from './pattern--type';
import patternPropertiesKeysRegexpLint from './pattern-properties--keys-regexp';
import patternPropertiesNonObjectLint from './pattern-properties--non-object';
import patternPropertiesTypeLint from './pattern-properties--type';
import patternPropertiesValuesTypeLint from './pattern-properties--values-type';
import propertiesTypeLint from './properties--type';
import propertiesValuesTypeLint from './properties--values-type';
import propertyNamesNonObjectLint from './property-names--non-object';
import propertyNamesTypeLint from './property-names--type';
import readOnlyTypeLint from './read-only--type';
import requiredDefinedLint from './required--defined';
import requiredNonObjectLint from './required--non-object';
import requiredTypeLint from './required--type';
import thenNonIfLint from './then--non-if';
import thenTypeLint from './then--type';
import titleTypeLint from './title--type';
import typeTypeLint from './type--type';
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
  additionalPropertiesNonObject,
  additionalPropertiesTypeLint,
  allOfTypeLint,
  allOfTypeOpenApi30Lint,
  anyOfTypeLint,
  anyOfTypeOpenApi30Lint,
  containsNonArrayLint,
  containsTypeLint,
  descriptionTypeLint,
  discriminatorExistInRequiredLint,
  discriminatorTypeLint,
  elseNonIfLint,
  elseTypeLint,
  enumUniqueLint,
  examplesTypeLint,
  exclusiveMaximumPatternLint,
  exclusiveMinimumPatternLint,
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
  maximumPatternLint,
  minItemsNonArrayLint,
  minItemsTypeLint,
  minLengthNonString,
  minLengthTypeLint,
  minPropertiesNonObjectLint,
  minPropertiesTypeLint,
  minimumPatternLint,
  multipleOfTypeLint,
  notTypeLint,
  oneOfTypeLint,
  oneOfTypeOpenApi30Lint,
  patternTypeLint,
  patternPropertiesKeysRegexpLint,
  patternPropertiesNonObjectLint,
  patternPropertiesTypeLint,
  patternPropertiesValuesTypeLint,
  propertiesTypeLint,
  propertiesValuesTypeLint,
  propertyNamesNonObjectLint,
  propertyNamesTypeLint,
  readOnlyTypeLint,
  requiredDefinedLint,
  requiredNonObjectLint,
  requiredTypeLint,
  thenNonIfLint,
  thenTypeLint,
  titleTypeLint,
  typeTypeLint,
  uniqueItemsNonArrayLint,
  uniqueItemsTypeLint,
  writeOnlyTypeLint,
  exampleDeprecatedLint,
];

export default schemaLints;
