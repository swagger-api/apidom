import allowedFieldsLint from './allowed-fields.ts';
import authorizationUrlRequiredLint from './authorization-url--required.ts';
import tokenUrlRequiredLint from './token-url--required.ts';
import authorizationUrlLint from './authorization-url--type.ts';
import tokenUrlLint from './token-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import pkceRequiredLint from './pkce-required--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [
  allowedFieldsLint,
  authorizationUrlRequiredLint,
  tokenUrlRequiredLint,
  authorizationUrlLint,
  tokenUrlLint,
  refreshUrlLint,
  pkceRequiredLint,
  scopesLint,
];

export default lints;
