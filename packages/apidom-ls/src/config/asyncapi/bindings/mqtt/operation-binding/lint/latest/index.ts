import allowedFieldsLint from './allowed-fields.ts';
import qosEqualsLint from './qos--equals.ts';
import retainTypeLint from './retain--type.ts';

const lints = [allowedFieldsLint, qosEqualsLint, retainTypeLint];

export default lints;
