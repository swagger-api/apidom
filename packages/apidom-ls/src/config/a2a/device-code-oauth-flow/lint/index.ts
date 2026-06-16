import allowedFieldsLint from './allowed-fields.ts';
import deviceAuthorizationUrlLint from './device-authorization-url--type.ts';
import tokenUrlLint from './token-url--type.ts';
import refreshUrlLint from './refresh-url--type.ts';
import scopesLint from './scopes--type.ts';

const lints = [
  allowedFieldsLint,
  deviceAuthorizationUrlLint,
  tokenUrlLint,
  refreshUrlLint,
  scopesLint,
];

export default lints;
