import allowedFieldsLint from './allowed-fields';
import methodTypeLint from './method--type';
import queryTypeLint from './query--type';
import headersTypeLint from './headers--type';

const lints = [allowedFieldsLint, methodTypeLint, queryTypeLint, headersTypeLint];

export default lints;
