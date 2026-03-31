import allowedFieldsLint from './allowed-fields.ts';
import qosEqualsLint from './qos--equals.ts';
import retainTypeLint from './retain--type.ts';
import messageExpiryIntervalTypeLint from './message-expiry-interval--type.ts';
import messageExpiryIntervalMinimumLint from './message-expiry-interval--minimum.ts';

const lints = [
  allowedFieldsLint,
  qosEqualsLint,
  retainTypeLint,
  messageExpiryIntervalTypeLint,
  messageExpiryIntervalMinimumLint,
];

export default lints;
