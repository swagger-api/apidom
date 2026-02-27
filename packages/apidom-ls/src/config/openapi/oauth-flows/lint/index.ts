import implicitLintTypeLint from './implicit--type.ts';
import passwordTypeLint from './password--type.ts';
import clientCredentialsTypeLint from './client-credentials--type.ts';
import authorizationCodeTypeLint from './authorization-code--type.ts';
import deviceAuthorizationTypeLint from './device-authorization--type.ts';
import allowedFieldsLint from './allowed-fields.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';

const lints = [
  implicitLintTypeLint,
  passwordTypeLint,
  clientCredentialsTypeLint,
  authorizationCodeTypeLint,
  deviceAuthorizationTypeLint,
  allowedFieldsLint,
  allowedFields3_2Lint,
];

export default lints;
