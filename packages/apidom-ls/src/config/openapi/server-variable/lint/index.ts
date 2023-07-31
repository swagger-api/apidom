import allowedFieldsLint from './allowed-fields';
import enumType3_0Lint from './enum--type-3-0';
import enumNonEmpty3_0Lint from './enum--non-empty-3-0';
import enumType3_1Lint from './enum--type-3-1';
import defaultTypeLint from './default--type';
import defaultInEnum3_0Lint from './default--in-enum-3-0';
import defaultInEnum3_1Lint from './default--in-enum-3-1';
import defaultRequiredLint from './default--required';
import descriptionTypeLint from './description--type';

const lints = [
  enumType3_0Lint,
  enumNonEmpty3_0Lint,
  enumType3_1Lint,
  defaultInEnum3_0Lint,
  defaultInEnum3_1Lint,
  defaultTypeLint,
  defaultRequiredLint,
  descriptionTypeLint,
  allowedFieldsLint,
];

export default lints;
