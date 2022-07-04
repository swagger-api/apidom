import allowedFieldsLint from './allowed-fields';
import isEqualsLint from './is--equals';
import exchangeTypeLint from './exchange--type';
import queueTypeLint from './queue--type';

const lints = [isEqualsLint, exchangeTypeLint, queueTypeLint, allowedFieldsLint];

export default lints;
