import allowedFieldsLint from './allowed-fields';
import exchangeTypeLint from './exchange--type';
import isEqualsLint from './is--equals';
import queueTypeLint from './queue--type';

const lints = [exchangeTypeLint, isEqualsLint, queueTypeLint, allowedFieldsLint];

export default lints;
