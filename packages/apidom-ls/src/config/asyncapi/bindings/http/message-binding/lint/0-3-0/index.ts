import allowedFieldsLint from './allowed-fields.ts';
import headersTypeLint from './headers--type.ts';
import statusCodeTypeLint from './status-code--type.ts';

const lints = [headersTypeLint, statusCodeTypeLint, allowedFieldsLint];

export default lints;
