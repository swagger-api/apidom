import allowedFieldsLint from './allowed-fields';
import isEqualsLint from './is--equals';
import exchangeTypeLint from './queue--type';
import queueTypeLint from '../../../nats/operation-binding/lint/queue--type';

const lints = [isEqualsLint, exchangeTypeLint, queueTypeLint, allowedFieldsLint];

export default lints;
