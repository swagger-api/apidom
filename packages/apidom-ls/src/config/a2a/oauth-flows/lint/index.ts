import allowedFieldsLint from './allowed-fields.ts';
import authorizationCodeLint from './authorization-code--type.ts';
import clientCredentialsLint from './client-credentials--type.ts';
import deviceCodeLint from './device-code--type.ts';
import implicitLint from './implicit--type.ts';
import passwordLint from './password--type.ts';

const lints = [
  allowedFieldsLint,
  authorizationCodeLint,
  clientCredentialsLint,
  deviceCodeLint,
  implicitLint,
  passwordLint,
];

export default lints;
