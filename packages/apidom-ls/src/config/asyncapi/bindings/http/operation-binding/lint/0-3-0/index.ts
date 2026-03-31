import allowedFieldsLint from './allowed-fields.ts';
import methodEqualsLint from './method--equals.ts';
import queryTypeLint from './query--type.ts';

const lints = [allowedFieldsLint, methodEqualsLint, queryTypeLint];

export default lints;
