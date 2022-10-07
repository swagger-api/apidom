import allowedFieldsLint from './allowed-fields';
import $refNoSiblingsLint from './$ref--no-siblings';
import $refValidLint from './$ref--valid';
import descriptionTypeLint from './description--type';
import contentValuesTypeLint from './content--values-type';
import contentRequiredLint from './content--required';
import requiredTypeLint from './required--type';

const lints = [
  allowedFieldsLint,
  $refNoSiblingsLint,
  $refValidLint,
  descriptionTypeLint,
  contentRequiredLint,
  contentValuesTypeLint,
  requiredTypeLint,
];

export default lints;
