import $idFormatURILint from './$id--format-uri.ts';
import $idTypeLint from './$id--type.ts';
import $idPatternLint from './$id--pattern.ts';
import $schemaFormatURILint from './$schema--format-uri.ts';
import $schemaTypeLint from './$schema--type.ts';
import $refFormatURILint from './$ref--format-uri.ts';
import $refTypeLint from './$ref--type.ts';
import $commentTypeLint from './$comment--type.ts';
import $anchorTypeLint from './$anchor--type.ts';
import $anchorPatternLint from './$anchor--pattern.ts';
import $dynamicRefTypeLint from './$dynamic-ref--type.ts';
import $dynamicRefFormatURILint from './$dynamic-ref--format-uri.ts';
import $dynamicAnchorTypeLint from './$dynamic-anchor--type.ts';
import $dynamicAnchorPatternLint from './$dynamic-anchor--pattern.ts';
import $vocabularyTypeLint from './$vocabulary--type.ts';
import $vocabularyValuesTypeLint from './$vocabulary--values-type.ts';
import $defsTypeLint from './$defs--type.ts';
import $defsValuesTypeLint from './$defs--values-type.ts';
import prefixItemsTypeLint from './prefix-items--type.ts';
import itemsTypeLint from './items--type.ts';
import containsTypeLint from './contains--type.ts';
import additionalPropertiesTypeLint from './additional-properties--type.ts';
import propertiesTypeLint from './properties--type.ts';
import propertiesValuesTypeLint from './properties--values-type.ts';
import patternPropertiesTypeLint from './pattern-properties--type.ts';
import patternPropertiesValuesTypeLint from './pattern-properties--values-type.ts';
import patternPropertiesKeysFormatRegexLint from './pattern-properties--keys-format-regex.ts';
import dependentSchemasTypeLint from './dependent-schemas--type.ts';
import dependentSchemasValuesTypeLint from './dependent-schemas--values-type.ts';
import propertyNamesTypeLint from './property-names--type.ts';
import ifTypeLint from './if--type.ts';
import thenTypeLint from './then--type.ts';
import elseTypeLint from './else--type.ts';
import allOfTypeLint from './all-of--type.ts';
import anyOfTypeLint from './any-of--type.ts';
import oneOfTypeLint from './one-of--type.ts';
import notTypeLint from './not--type.ts';
import unevaluatedItemsTypeLint from './unevaluated-items--type.ts';
import unevaluatedPropertiesTypeLint from './unevaluated-properties--type.ts';
import typeEqualsLint from './type--equals.ts';
import enumTypeLint from './enum--type.ts';
import multipleOfTypeLint from './multiple-of--type.ts';
import maximumTypeLint from './maximum--type.ts';
import exclusiveMaximumTypeLint from './exclusive-maximum--type.ts';
import minimumTypeLint from './minimum--type.ts';
import exclusiveMinimumTypeLint from './exclusive-minimum--type.ts';
import maxLengthTypeLint from './max-length--type.ts';
import minLengthTypeLint from './min-length--type.ts';
import patternTypeLint from './pattern--type.ts';
import patternFormatRegexLint from './pattern--format-regex.ts';
import maxItemsTypeLint from './max-items--type.ts';
import minItemsTypeLint from './min-items--type.ts';
import uniqueItemsTypeLint from './unique-items--type.ts';
import maxContainsTypeLint from './max-contains--type.ts';
import minContainsTypeLint from './min-contains--type.ts';
import maxPropertiesTypeLint from './max-properties--type.ts';
import minPropertiesTypeLint from './min-properties--type.ts';
import requiredTypeLint from './required--type.ts';
import requiredUniqueLint from './required--unique.ts';
import dependentRequiredTypeLint from './dependent-required--type.ts';
import dependentRequiredValuesTypeLint from './dependent-required--values-type.ts';
import dependentRequiredValuesUniqueLint from './dependent-required--values-unique.ts';
import titleTypeLint from './title--type.ts';
import descriptionTypeLint from './description--type.ts';
import deprecatedTypeLint from './deprecated--type.ts';
import readOnlyTypeLint from './read-only--type.ts';
import writeOnlyTypeLint from './write-only--type.ts';
import examplesTypeLint from './examples--type.ts';
import formatTypeLint from './format--type.ts';
import contentEncodingTypeLint from './content-encoding--type.ts';
import contentMediaTypeTypeLint from './content-media-type--type.ts';
import contentSchemaTypeLint from './content-schema--type.ts';
import baseTypeLint from './base--type.ts';
import linksTypeLint from './links--type.ts';

const lints = [
  $idFormatURILint,
  $idTypeLint,
  $idPatternLint,
  $schemaFormatURILint,
  $schemaTypeLint,
  $refFormatURILint,
  $refTypeLint,
  $commentTypeLint,
  $anchorTypeLint,
  $anchorPatternLint,
  $dynamicRefTypeLint,
  $dynamicRefFormatURILint,
  $dynamicAnchorTypeLint,
  $dynamicAnchorPatternLint,
  $vocabularyTypeLint,
  $vocabularyValuesTypeLint,
  $defsTypeLint,
  $defsValuesTypeLint,
  prefixItemsTypeLint,
  itemsTypeLint,
  containsTypeLint,
  additionalPropertiesTypeLint,
  propertiesTypeLint,
  propertiesValuesTypeLint,
  patternPropertiesTypeLint,
  patternPropertiesValuesTypeLint,
  patternPropertiesKeysFormatRegexLint,
  dependentSchemasTypeLint,
  dependentSchemasValuesTypeLint,
  propertyNamesTypeLint,
  ifTypeLint,
  thenTypeLint,
  elseTypeLint,
  allOfTypeLint,
  anyOfTypeLint,
  oneOfTypeLint,
  notTypeLint,
  unevaluatedItemsTypeLint,
  unevaluatedPropertiesTypeLint,
  typeEqualsLint,
  enumTypeLint,
  multipleOfTypeLint,
  maximumTypeLint,
  exclusiveMaximumTypeLint,
  minimumTypeLint,
  exclusiveMinimumTypeLint,
  maxLengthTypeLint,
  minLengthTypeLint,
  patternTypeLint,
  patternFormatRegexLint,
  maxItemsTypeLint,
  minItemsTypeLint,
  uniqueItemsTypeLint,
  maxContainsTypeLint,
  minContainsTypeLint,
  maxPropertiesTypeLint,
  minPropertiesTypeLint,
  requiredTypeLint,
  requiredUniqueLint,
  dependentRequiredTypeLint,
  dependentRequiredValuesTypeLint,
  dependentRequiredValuesUniqueLint,
  titleTypeLint,
  descriptionTypeLint,
  deprecatedTypeLint,
  readOnlyTypeLint,
  writeOnlyTypeLint,
  examplesTypeLint,
  formatTypeLint,
  contentEncodingTypeLint,
  contentMediaTypeTypeLint,
  contentSchemaTypeLint,
  baseTypeLint,
  linksTypeLint,
];

export default lints;
