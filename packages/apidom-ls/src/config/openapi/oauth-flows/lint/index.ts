import implicitLintTypeLint from './implicit--type.ts';
import passwordTypeLint from './password--type.ts';
import clientCredentialsTypeLint from './client-credentials--type.ts';
import authorizationCodeTypeLint from './authorization-code--type.ts';
import allowedFieldsLint from './allowed-fields.ts';

const lints = [
  implicitLintTypeLint,
  passwordTypeLint,
  clientCredentialsTypeLint,
  authorizationCodeTypeLint,
  allowedFieldsLint,
];

export default lints;
