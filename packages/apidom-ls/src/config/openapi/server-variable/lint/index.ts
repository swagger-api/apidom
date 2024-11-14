import allowedFieldsLint from './allowed-fields.ts';
import enumType3_0Lint from './enum--type-3-0.ts';
import enumNonEmpty3_0Lint from './enum--non-empty-3-0.ts';
import enumType3_1Lint from './enum--type-3-1.ts';
import defaultTypeLint from './default--type.ts';
import defaultInEnum3_0Lint from './default--in-enum-3-0.ts';
import defaultInEnum3_1Lint from './default--in-enum-3-1.ts';
import defaultRequiredLint from './default--required.ts';
import descriptionTypeLint from './description--type.ts';

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
