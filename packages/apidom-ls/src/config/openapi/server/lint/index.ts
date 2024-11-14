import allowedFieldsLint from './allowed-fields.ts';
import urlFormatURILint from './url--format-uri.ts';
import urlRequiredLint from './url--required.ts';
import descriptionTypeLint from './description--type.ts';
import variablesValuesTypeLint from './variables--values-type.ts';

const lints = [
  urlFormatURILint,
  urlRequiredLint,
  descriptionTypeLint,
  variablesValuesTypeLint,
  allowedFieldsLint,
];

export default lints;
