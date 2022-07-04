import allowedFieldsLint from './allowed-fields';
import clientIdTypeLint from './client-id--type';
import cleanSessionTypeLint from './clean-session--type';
import lastWillTypeLint from './last-will--type';
import keepAliveTypeLint from './keep-alive--type';
import bindingVersionTypeLint from './binding-version--type';

const lints = [
  allowedFieldsLint,
  clientIdTypeLint,
  cleanSessionTypeLint,
  lastWillTypeLint,
  keepAliveTypeLint,
  bindingVersionTypeLint,
];

export default lints;
