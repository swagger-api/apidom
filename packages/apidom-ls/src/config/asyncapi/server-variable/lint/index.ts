import allowedFieldsLint from './allowed-fields';
import enumTypeLint from './enum--type';
import defaultTypeLint from './default--type';
import descriptionTypeLint from './description--type';
import examplesTypeLint from './examples--type';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';

const lints = [
  allowedFieldsLint,
  enumTypeLint,
  defaultTypeLint,
  descriptionTypeLint,
  examplesTypeLint,
  $refValidLint,
  $refNoSiblingsLint,
];

export default lints;
