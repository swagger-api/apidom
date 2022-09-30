import allowedFieldsLint from './allowed-fields';
import urlFormatURILint from './url--format-uri';
import urlRequiredLint from './url--required';
import descriptionTypeLint from './description--type';
import variablesValuesTypeLint from './variables--values-type';

const lints = [
  urlFormatURILint,
  urlRequiredLint,
  descriptionTypeLint,
  variablesValuesTypeLint,
  allowedFieldsLint,
];

export default lints;
