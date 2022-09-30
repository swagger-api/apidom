import allowedFieldsLint from './allowed-fields';
import enumTypeLint from './enum--type';
import defaultTypeLint from './default--type';
import defaultRequiredLint from './default--required';
import descriptionTypeLint from './description--type';

const lints = [
  enumTypeLint,
  defaultTypeLint,
  defaultRequiredLint,
  descriptionTypeLint,
  allowedFieldsLint,
];

export default lints;
