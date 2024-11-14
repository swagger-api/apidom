import allowedFieldsLint from './allowed-fields.ts';
import descriptionTypeLint from './description--type.ts';
import locationTypeLint from './location--type.ts';
import locationRequiredLint from './location--required.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

const lints = [
  descriptionTypeLint,
  locationTypeLint,
  locationRequiredLint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFieldsLint,
];

export default lints;
