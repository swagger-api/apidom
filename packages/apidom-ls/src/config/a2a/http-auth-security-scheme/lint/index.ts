import allowedFieldsLint from './allowed-fields.ts';
import schemeRequiredLint from './scheme--required.ts';
import schemeTypeLint from './scheme--type.ts';
import descriptionTypeLint from './description--type.ts';
import bearerFormatTypeLint from './bearer-format--type.ts';

const lints = [
  allowedFieldsLint,
  schemeRequiredLint,
  schemeTypeLint,
  descriptionTypeLint,
  bearerFormatTypeLint,
];

export default lints;
