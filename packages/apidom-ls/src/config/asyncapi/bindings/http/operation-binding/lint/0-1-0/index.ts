import allowedFieldsLint from './allowed-fields.ts';
import typeEqualsLint from './type--equals.ts';
import typeRequiredLint from './type--required.ts';
import methodEqualsLint from './method--equals.ts';
import queryTypeLint from './query--type.ts';

const lints = [
  allowedFieldsLint,
  typeEqualsLint,
  typeRequiredLint,
  methodEqualsLint,
  queryTypeLint,
];

export default lints;
