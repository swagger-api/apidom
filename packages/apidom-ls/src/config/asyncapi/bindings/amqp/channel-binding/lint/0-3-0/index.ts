import allowedFieldsLint from './allowed-fields.ts';
import exchangeTypeLint from './exchange--type.ts';
import isEqualsLint from './is--equals.ts';
import queueTypeLint from './queue--type.ts';

const lints = [exchangeTypeLint, isEqualsLint, queueTypeLint, allowedFieldsLint];

export default lints;
