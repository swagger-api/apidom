import allowedFieldsLint from './allowed-fields.ts';
import qosEqualsLint from './qos--equals.ts';
import retainTypeLint from './retain--type.ts';
import messageExpiryIntervalTypeLint from './message-expiry-interval--type.ts';

const lints = [allowedFieldsLint, qosEqualsLint, retainTypeLint, messageExpiryIntervalTypeLint];

export default lints;
