import allowedFieldsLint from './allowed-fields';
import descriptionTypeLint from './description--type';
import locationTypeLint from './location--type';
import locationRequiredLint from './location--required';
import $refValidLint from './$ref--valid';
import $refNoSiblingsLint from './$ref--no-siblings';

const lints = [
  descriptionTypeLint,
  locationTypeLint,
  locationRequiredLint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFieldsLint,
];

export default lints;
