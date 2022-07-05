import allowedFieldsLint from './allowed-fields';
import allowedFieldsTypeBinaryLint from './allowed-fields--type-binary';
import typeEqualsLint from './type--equals';
import headersTypeLint from './headers--type';
import descriptionTypeLint from './description--type';
import expiryTypeLint from './expiry--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  typeEqualsLint,
  headersTypeLint,
  descriptionTypeLint,
  expiryTypeLint,
  bindingVersionTypeLint,
  allowedFieldsLint,
  allowedFieldsTypeBinaryLint,
];

export default lints;
