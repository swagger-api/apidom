import allowedFieldsLint from './allowed-fields';
import typeEqualsLint from './type--equals';
import typeRequiredLint from './type--required';
import formatTypeLint from './format--type';
import itemsTypeLint from './items--type';
import itemsRequiredLint from './items--required';
import collectionFormatEqualsLint from './collection-format--equals';
import maximumTypeLint from './maximum--type';
import exclusiveMaximumTypeLint from './exclusive-maximum--type';
import minimumTypeLint from './minimum--type';
import exclusiveMinimumTypeLint from './exclusive-minimum--type';
import maxLengthTypeLint from './max-length--type';
import minLengthTypeLint from './min-length--type';
import uniqueItemsTypeLint from './unique-items--type';
import enumTypeLint from './enum--type';
import multipleOfTypeLint from './multiple-of--type';

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
  uniqueItemsTypeLint,
  enumTypeLint,
  multipleOfTypeLint,
  allowedFieldsLint,
];

export default lints;
