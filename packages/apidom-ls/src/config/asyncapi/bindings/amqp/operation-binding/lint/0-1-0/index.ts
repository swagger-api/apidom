import allowedFieldsLint from './allowed-fields';
import expirationTypeLint from './expiration--type';
import userIdTypeLint from './user-id--type';
import ccTypeLint from './cc--type';
import priorityTypeLint from './priority--type';
import deliveryModeEqualsLint from './delivery-mode--equals';
import mandatoryTypeLint from './mandatory--type';
import bccTypeLint from './bcc--type';
import replyToTypeLint from './reply-to--type';
import timestampTypeLint from './timestamp--type';
import ackTypeLint from './act--type';

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
