import allowedFieldsLint from './allowed-fields.ts';
import methodTypeLint from './method--type.ts';
import queryTypeLint from './query--type.ts';
import headersTypeLint from './headers--type.ts';

const lints = [allowedFieldsLint, methodTypeLint, queryTypeLint, headersTypeLint];

export default lints;
