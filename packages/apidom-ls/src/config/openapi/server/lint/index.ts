import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';
import urlFormatURILint from './url--format-uri.ts';
import urlRequiredLint from './url--required.ts';
import descriptionTypeLint from './description--type.ts';
import variablesValuesTypeLint from './variables--values-type.ts';
import nameTypeLint from './name--type.ts';

const lints = [
  urlFormatURILint,
  urlRequiredLint,
  descriptionTypeLint,
  variablesValuesTypeLint,
  nameTypeLint,
  allowedFieldsLint,
  allowedFields3_2Lint,
];

export default lints;
