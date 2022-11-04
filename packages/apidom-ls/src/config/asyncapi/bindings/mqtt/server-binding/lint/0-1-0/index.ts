import allowedFieldsLint from './allowed-fields';
import clientIdTypeLint from './client-id--type';
import cleanSessionTypeLint from './clean-session--type';
import lastWillTypeLint from './last-will--type';
import keepAliveTypeLint from './keep-alive--type';

const lints = [
  allowedFieldsLint,
  clientIdTypeLint,
  cleanSessionTypeLint,
  lastWillTypeLint,
  keepAliveTypeLint,
];

export default lints;
