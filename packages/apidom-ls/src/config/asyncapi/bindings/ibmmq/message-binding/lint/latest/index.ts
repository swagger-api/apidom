import allowedFieldsLint from './allowed-fields.ts';
import allowedFieldsTypeBinaryLint from './allowed-fields--type-binary.ts';
import typeEqualsLint from './type--equals.ts';
import headersTypeLint from './headers--type.ts';
import descriptionTypeLint from './description--type.ts';
import expiryTypeLint from './expiry--type.ts';

const lints = [
  typeEqualsLint,
  headersTypeLint,
  descriptionTypeLint,
  expiryTypeLint,
  allowedFieldsLint,
  allowedFieldsTypeBinaryLint,
];

export default lints;
