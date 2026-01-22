import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';
import nameTypeLint from './name--type.ts';
import nameRequiredLint from './name--required.ts';
import descriptionTypeLint from './description--type.ts';
import externalDocsTypeLint from './external-docs--type.ts';
import nameUniqueLint from './name--unique.ts';

const lints = [
  allowedFieldsLint,
  allowedFields3_2Lint,
  nameTypeLint,
  nameRequiredLint,
  nameUniqueLint,
  descriptionTypeLint,
  externalDocsTypeLint,
];

export default lints;
