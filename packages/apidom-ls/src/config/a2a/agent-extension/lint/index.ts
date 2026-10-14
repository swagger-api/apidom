import allowedFieldsLint from './allowed-fields.ts';
import uriTypeLint from './uri--type.ts';
import descriptionTypeLint from './description--type.ts';
import requiredTypeLint from './required--type.ts';
import paramsTypeLint from './params--type.ts';

const lints = [
  allowedFieldsLint,
  uriTypeLint,
  descriptionTypeLint,
  requiredTypeLint,
  paramsTypeLint,
];

export default lints;
