import allowedFieldsLint from './allowed-fields.ts';
import typeTypeLint from './type--type.ts';
import typeRequiredLint from './type--required.ts';
import methodTypeLint from './method--type.ts';
import queryTypeLint from './query--type.ts';

const lints = [allowedFieldsLint, typeTypeLint, typeRequiredLint, methodTypeLint, queryTypeLint];

export default lints;
