import allowedFieldsLint from './allowed-fields.ts';
import authorizationUrlLint from './authorization-url--type.ts';
import tokenUrlLint from './token-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import pkceRequiredLint from './pkce-required--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [
  allowedFieldsLint,
  authorizationUrlLint,
  tokenUrlLint,
  refreshUrlLint,
  pkceRequiredLint,
  scopesLint,
];

export default lints;
