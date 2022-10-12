import implicitLintTypeLint from './implicit--type';
import passwordTypeLint from './password--type';
import clientCredentialsTypeLint from './client-credentials--type';
import authorizationCodeTypeLint from './authorization-code--type';
import allowedFieldsLint from './allowed-fields';

const lints = [
  implicitLintTypeLint,
  passwordTypeLint,
  clientCredentialsTypeLint,
  authorizationCodeTypeLint,
  allowedFieldsLint,
];

export default lints;
