import allowedFieldsLint from './allowed-fields.ts';
import clientIdTypeLint from './client-id--type.ts';
import cleanSessionTypeLint from './clean-session--type.ts';
import lastWillTypeLint from './last-will--type.ts';
import keepAliveTypeLint from './keep-alive--type.ts';
import sessionExpiryIntervalTypeLint from './session-expiry-interval--type.ts';
import sessionExpiryIntervalMinimumLint from './session-expiry-interval--minimum.ts';
import maximumPacketSizeTypeLint from './maximum-packet-size--type.ts';
import maximumPacketSizeMinimumLint from './maximum-packet-size--minimum.ts';

const lints = [
  allowedFieldsLint,
  clientIdTypeLint,
  cleanSessionTypeLint,
  lastWillTypeLint,
  keepAliveTypeLint,
  sessionExpiryIntervalTypeLint,
  sessionExpiryIntervalMinimumLint,
  maximumPacketSizeTypeLint,
  maximumPacketSizeMinimumLint,
];

export default lints;
