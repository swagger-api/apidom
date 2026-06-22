import allowedFieldsLint from './allowed-fields.ts';
import locationRequiredLint from './location--required.ts';
import nameRequiredLint from './name--required.ts';
import nameTypeLint from './name--type.ts';
import descriptionTypeLint from './description--type.ts';
import locationValueLint from './location--value.ts';

const lints = [
  allowedFieldsLint,
  locationRequiredLint,
  nameRequiredLint,
  nameTypeLint,
  descriptionTypeLint,
  locationValueLint,
];

export default lints;
