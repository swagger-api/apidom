import allowedFieldsLint from './allowed-fields.ts';
import enumTypeLint from './enum--type.ts';
import defaultTypeLint from './default--type.ts';
import descriptionTypeLint from './description--type.ts';
import examplesTypeLint from './examples--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

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
