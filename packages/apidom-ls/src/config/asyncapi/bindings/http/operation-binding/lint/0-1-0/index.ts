import allowedFieldsLint from './allowed-fields.ts';
import typeTypeLint from './type--type.ts';
import typeRequiredLint from './type--required.ts';
import methodEqualsLint from './method--equals.ts';
import queryTypeLint from './query--type.ts';

const lints = [allowedFieldsLint, typeTypeLint, typeRequiredLint, methodEqualsLint, queryTypeLint];

export default lints;
