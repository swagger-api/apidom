import allowedFieldsLint from './allowed-fields';
import nameTypeLint from './name--type';
import nameRequiredLint from './name--required';
import descriptionTypeLint from './description--type';
import externalDocsTypeLint from './external-docs--type';

const lints = [
  allowedFieldsLint,
  nameTypeLint,
  nameRequiredLint,
  descriptionTypeLint,
  externalDocsTypeLint,
];

export default lints;
