import allowedFieldsLint from './allowed-fields.ts';
import locationRequiredLint from './location--required.ts';
import nameRequiredLint from './name--required.ts';
import nameTypeLint from './name--type.ts';
import descriptionTypeLint from './description--type.ts';
import locationEqualsLint from './location--equals.ts';

const lints = [
  allowedFieldsLint,
  locationRequiredLint,
  nameRequiredLint,
  nameTypeLint,
  descriptionTypeLint,
  locationEqualsLint,
];

export default lints;
