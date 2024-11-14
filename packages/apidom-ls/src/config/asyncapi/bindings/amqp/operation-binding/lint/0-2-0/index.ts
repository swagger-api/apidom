import allowedFieldsLint from './allowed-fields.ts';
import expirationTypeLint from './expiration--type.ts';
import userIdTypeLint from './user-id--type.ts';
import ccTypeLint from './cc--type.ts';
import priorityTypeLint from './priority--type.ts';
import deliveryModeEqualsLint from './delivery-mode--equals.ts';
import mandatoryTypeLint from './mandatory--type.ts';
import bccTypeLint from './bcc--type.ts';
import replyToTypeLint from './reply-to--type.ts';
import timestampTypeLint from './timestamp--type.ts';
import ackTypeLint from './act--type.ts';

const lints = [
  expirationTypeLint,
  userIdTypeLint,
  ccTypeLint,
  priorityTypeLint,
  deliveryModeEqualsLint,
  mandatoryTypeLint,
  bccTypeLint,
  replyToTypeLint,
  timestampTypeLint,
  ackTypeLint,
  allowedFieldsLint,
];

export default lints;
