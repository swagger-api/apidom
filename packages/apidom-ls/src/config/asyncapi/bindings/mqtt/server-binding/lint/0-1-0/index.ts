import allowedFieldsLint from './allowed-fields.ts';
import clientIdTypeLint from './client-id--type.ts';
import cleanSessionTypeLint from './clean-session--type.ts';
import lastWillTypeLint from './last-will--type.ts';
import keepAliveTypeLint from './keep-alive--type.ts';

const lints = [
  allowedFieldsLint,
  clientIdTypeLint,
  cleanSessionTypeLint,
  lastWillTypeLint,
  keepAliveTypeLint,
];

export default lints;
