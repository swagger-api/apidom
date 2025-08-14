import allowedFieldsLint from './allowed-fields.ts';
import nameTypeLint from './name--type.ts';
import nameRequiredLint from './name--required.ts';
import descriptionTypeLint from './description--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';
import nameUniqueLint from './name--unique.ts';

const lints = [
  allowedFieldsLint,
  nameTypeLint,
  nameRequiredLint,
  nameUniqueLint,
  descriptionTypeLint,
  externalDocsTypeLint,
];

export default lints;
