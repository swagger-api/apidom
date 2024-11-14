import allowedFieldsLint from './allowed-fields.ts';
import typeEqualsLint from './type--equals.ts';
import typeRequiredLint from './type--required.ts';
import formatTypeLint from './format--type.ts';
import itemsTypeLint from './items--type.ts';
import itemsRequiredLint from './items--required.ts';
import collectionFormatEqualsLint from './collection-format--equals.ts';
import maximumTypeLint from './maximum--type.ts';
import exclusiveMaximumTypeLint from './exclusive-maximum--type.ts';
import minimumTypeLint from './minimum--type.ts';
import exclusiveMinimumTypeLint from './exclusive-minimum--type.ts';
import maxLengthTypeLint from './max-length--type.ts';
import minLengthTypeLint from './min-length--type.ts';
import patternTypeLint from './pattern--type.ts';
import maxItemsTypeLint from './max-items--type.ts';
import minItemsTypeLint from './min-items--type.ts';
import uniqueItemsTypeLint from './unique-items--type.ts';
import enumTypeLint from './enum--type.ts';
import multipleOfTypeLint from './multiple-of--type.ts';

const lints = [
  typeEqualsLint,
  typeRequiredLint,
  formatTypeLint,
  itemsTypeLint,
  itemsRequiredLint,
  collectionFormatEqualsLint,
  maximumTypeLint,
  exclusiveMaximumTypeLint,
  minimumTypeLint,
  exclusiveMinimumTypeLint,
  maxLengthTypeLint,
  minLengthTypeLint,
  patternTypeLint,
  maxItemsTypeLint,
  minItemsTypeLint,
  uniqueItemsTypeLint,
  enumTypeLint,
  multipleOfTypeLint,
  allowedFieldsLint,
];

export default lints;
