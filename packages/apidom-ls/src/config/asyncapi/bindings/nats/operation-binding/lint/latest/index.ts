import allowedFieldsLint from './allowed-fields.ts';
import queueTypeLint from './queue--type.ts';
import queueMaxLengthLint from './queue--max-length.ts';

const lints = [allowedFieldsLint, queueTypeLint, queueMaxLengthLint];

export default lints;
