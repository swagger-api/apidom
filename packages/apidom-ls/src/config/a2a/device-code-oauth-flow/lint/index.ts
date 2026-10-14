import allowedFieldsLint from './allowed-fields.ts';
import deviceAuthorizationUrlRequiredLint from './device-authorization-url--required.ts';
import tokenUrlRequiredLint from './token-url--required.ts';
import scopesRequiredLint from './scopes--required.ts';
import deviceAuthorizationUrlLint from './device-authorization-url--type.ts';
import tokenUrlLint from './token-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [
  allowedFieldsLint,
  deviceAuthorizationUrlRequiredLint,
  tokenUrlRequiredLint,
  scopesRequiredLint,
  deviceAuthorizationUrlLint,
  tokenUrlLint,
  refreshUrlLint,
  scopesLint,
];

export default lints;
